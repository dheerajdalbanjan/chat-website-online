const socket = io() ; 

const messagespace = document.querySelector(".message") ;
var messageElement ; 

const append = (message , position)=>{
    messageElement = document.createElement('div') ; 
    messageElement.innerText = message  ;
    messageElement.classList.add('flex' , 'font-thin'  ,  'bg-slate-500'  , 'h-14' , 'w-fit' ,'md:rounded-full' ,'rounded-lg' , 'rounded-br-none'  , 'mx-7' , 'py-4' , 'px-8' , 'text-white' , 'max-w-[18rem]' , 'md:max-w-[40rem]' );
    const array = position.split(" ") ;
    array.forEach(arrayf=> {
        messageElement.classList.add(arrayf) ;
    }); 
    messagespace.append(messageElement) ;
}


const name = prompt("Enter your name" ) ; 

socket.emit(`new-user-joined` , name) ;

socket.on(`user-joined` , name=>{
    append(`${name} joined the chat` , 'self-end' + ' ' + 'bg-blue-300') ; 
    
})

socket.on(`receive` , data =>{
    append(`${data.name} : ${data.message} ` , 'self-start' +  ' ' + 'rounded-bl-none' + ' ' + 'md:rounded-bl-none' + 'rounded-br-xl') ; 
    messageElement.classList.add('rounded-br-full' , 'rounded-bl-none') ; 
})

const input = document.querySelector("input") ;

document.querySelector("form").addEventListener('submit' , (e)=>{
    e.preventDefault() ;
    const message = input.value ; 
    input.value = "" ; 
    append(`You : ${message}`, 'self-end')  ;
    socket.emit('send' , message) ;

})

socket.on('left' , name =>{
    append(`${name} left the chat` , 'self-start'   + ' ' + 'rounded-bl-none' + ' ' + 'md:rounded-bl-none' + 'rounded-br-xl' + ' ' + 'bg-red-300' + ' ' + 'text-black') ; 
})

