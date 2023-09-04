
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu')

btn.addEventListener('click', ()=>{
    btn.classList.toggle('open')
    nav.classList.toggle('flex')
    nav.classList.toggle('hidden')

})


// Initialization for ES Users
const myExample = document.getElementById("myExample");
const alertInstance = te.Alert.getInstance(
  document.getElementById("container-example")
);

myExample.addEventListener("copy.te.clipboard", () => {
  myExample.innerText = "Copied!";
  alertInstance.show();

  setTimeout(() => {
    myExample.innerText = "COPY";
  }, 4000);
});