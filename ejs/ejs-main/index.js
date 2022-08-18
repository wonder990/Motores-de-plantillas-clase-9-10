const express = require('express');
const app = express();
const PORT = 8080;

const contenedor = require('./Contenedor')
const container = new contenedor('productos.txt')
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');



app.get('/products', async (req, res) => {
  const productos = await container.getAll()
   
  if(productos){
    res.render('pages/products', { title: 'listado de productos', products: productos });
  } else {
    res.render('pages/emptyList')
  }
   
});

app.get('/products/:id', (req, res) => {
  let {id} = req.params;
  const found = productsHC.find(e=>e.id == id);
  if(found){
    res.render('pages/product', { title: 'producto seleccionado', producto: found });
  } else{
    res.render('pages/error', { msg: 'el producto que buscabas no existe' });
  }
});


app.get('/form',(req,res)=>{
  res.render('pages/form')
})

app.post('/products', async (req,res)=>{  //funca
  let {body} = req;
  let saveProduct = container.save(body)
  
  res.redirect('/products')
})