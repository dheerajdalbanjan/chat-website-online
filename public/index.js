const socket = io() ; 

const messagespace = document.querySelector(".message") ;
var messageElement ; 
const sound = new Audio("s.mp3") ;


function topScroll(){
    messagespace.scrollTop = 0 ; 
}


const append = (message , position)=>{
    messageElement = document.createElement('div') ; 
    messageElement.innerText = message  ;
    messageElement.classList.add('flex' , 'font-normal'   , 'shadow-lg' , 'h-auto' , 'w-fit' ,'md:rounded-full' ,'rounded-lg'    , 'text-white' , 'max-w-[18rem]' , 'md:max-w-[40rem]' , 'md:py-4', 'md:px-8' ,'p-3');
    const array = position.split(" ") ;
    array.forEach(arrayf=> {
        messageElement.classList.add(arrayf) ;
    }); 
    messagespace.append(messageElement) ;
        messagespace.scrollTop = 1000 ; 
}


const name = prompt("Enter your name" ) ; 

socket.emit(`new-user-joined` , name) ;

socket.on(`user-joined` , name=>{
    append(`${name} joined the chat` , 'self-end' + ' ' + 'bg-blue-300' + ' ' + 'rounded-br-none' + ' ' +  'md:rounded-br-none') ; 
    sound.play() ;
    
})

socket.on(`receive` , data =>{
    append(`${data.name} : ${data.message} ` , 'self-start' + ' ' + 'bg-teal-300' + ' ' + 'text-black' + ' ' + 'md:rounded-bl-none' + ' ' +  'rounded-br-xl' + ' ' + 'rounded-bl-none' ) ; 
    sound.play() ;
})

const input = document.querySelector("input") ;

document.querySelector("form").addEventListener('submit' , (e)=>{
    e.preventDefault() ;
    const message = input.value ; 
    input.value = "" ; 
    append(`You : ${message}`, 'self-end' + ' ' + 'md:rounded-br-none' + ' ' + 'rounded-br-none' + ' ' + 'bg-slate-500')  ;
    socket.emit('send' , message) ;

})

socket.on('left' , name =>{
    append(`${name} left the chat` , 'self-start'   + ' ' + 'rounded-bl-none' + ' ' + 'md:rounded-bl-none' + ' ' +   'rounded-br-xl' + ' ' + 'bg-red-300' + ' ' + 'text-black') ; 
    sound.play() ;
})

