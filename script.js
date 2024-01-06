const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// for error
function show_error(input,message){
  const form_control = input.parentElement
  form_control.className ='form-control error'
  const small = form_control.querySelector('small')
  small.innerText = message
}

// for success
function show_success(input){
  const form_control = input.parentElement
  form_control.className ='form-control success'
}

// check email is valid (regex is copy pased)
function check_email(input){
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(input.value.trim())) {
    show_success(input)
  } else {
    show_error(input,'Email is not valid.')
  }
}

// check required fields
function check_required(input_arr){
  input_arr.forEach(input => {
    if(input.value.trim() == ''){
      show_error(input, `${get_field_name(input)} is required`)
    }else{
      show_success(input)
    }
  })
}

// check input length
function check_length(input,min,max){
  if(input.value.length < min){
    show_error(input,`${get_field_name(input)} must be at least ${min} characters`)
  }else if(input.value.length > max){
    show_error(input,`${get_field_name(input)}  must be maximum ${max} characters`)
  }else{
    show_success(input)
  }
}

// check passwords match
function check_passwords_match(pass,repass){
  if(pass.value !== repass.value){
    show_error(repass,'passwords do not match')
  }
}

function get_field_name(input){
  return input.title.charAt(0).toUpperCase().concat(input.title.slice(1))
}

// event listener
form.addEventListener('submit', (event) => {
  event.preventDefault()

  
  check_required([username,email,password,password2])
  check_length(username,3,15)
  check_length(password,6,25)
  check_email(email)
  check_passwords_match(password,password2)
})