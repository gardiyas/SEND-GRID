// Data for the "HTML Images" Page

const images = [{
  caption: 'Chicken Msala',
  alt: 'Chicken',
  url: 'food/p1.webp',
  price: "$13.95"
  
},

{
  caption: 'Beef Cury and chicken',
  alt: 'Beef Cury and chicken',
  url: 'food/p3.webp',
  price: "$14.60"
},
{
  caption: 'Cocunut Shrimp',
  alt: 'Shrimp coconut',
  url: 'food/p4.webp',
  price: "$13.95"
},
{
  caption: 'Goat Cheese Chicken',
  alt: 'Goat Cheese Chicken',
  url: 'food/p5.webp',
  price: "$13.95"
},
{
  caption: 'Cocunut Curry Salmon',
  alt: 'Cocunut Curry Salmon',
  url: 'food/p6.webp',
  price: "$12.95"
},

{
  caption: 'Butter Chicken and Veggies',
  alt: 'Butter Chicken and Veggies',
  url: 'food/p2.webp',
  price: "$12.00"
},
{
  caption: 'Keto Cheese Steak',
  alt: 'Keto Cheese Steak',
  url: 'food/p7.webp',
  price: "$12.00"
},
{
  caption: 'Garlic Butter Salmon',
  alt: 'Garlic Butter Salmon',
  url: 'food/p8.webp',
  price: "$12.95"
},

];




function image() {
let figure = "<figure>";


for (var i = 0; i < images.length; i++) {
  figure += "<div>" + "<img src='" + images[i].url + "'" + "alt='" + images[i].alt + "'>" + "<p>" + images[i].caption + "</p>" + "<p>" + images[i].price + "</p>" + "</div>";
  // para+= "<p>"+images[i].caption + "</p>";
}
figure = figure + "</figure>";

return figure;
}

document.getElementById("row2").innerHTML = image();
