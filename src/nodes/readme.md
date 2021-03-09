


```js
copy(`'${document.querySelector('h1').innerText.match(/.* - (.*)/)[1]}' : {
    text: \`${document.querySelector('.long-content p:nth-child(2)').innerText}\`,
    link: '${location.href}',
},\n`)
```