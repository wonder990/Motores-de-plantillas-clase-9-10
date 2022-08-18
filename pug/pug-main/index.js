const express = require('express');
const app = express();
const PORT = 8080;

const contenedor = require('./Contenedor.js')
const container = new contenedor('products.txt')

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');





app.get('/products', async (req, res) => {
  const products = await container.getAll()
  if (products) {
    res.render('products.pug', { title: 'listado', products: products });
  } else{
    res.render('emptyList.pug');
  }
  
});


app.get('/products/:id',(req,res)=>{
  let {id} = req.params
  let found = productsHC.find(e=>e.id == id)
  res.render('item.pug',{title:'un producto' , found })
})


app.get('/form', (req,res)=>{
  res.render('form.pug',{title:'ingresar producto'})
})

app.post('/products', async (req,res)=>{
  let {body} = req;
  let saveProducts = await container.save(body)
  
  res.redirect('/products')
})