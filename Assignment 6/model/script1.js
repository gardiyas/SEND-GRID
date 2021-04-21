
class ServiceDB {

  services = [];


  constructor() {
    this.services.push({
      caption: 'Chicken Msala',
      alt: 'Chicken',
      url: 'Food/p1.jpg',
      price: "$13.95"

    });
    this.services.push({
      caption: 'Beef Cury and chicken',
      alt: 'Beef Cury and chicken',
      url: 'Food/p3.jpg',
      price: "$14.60"
    });
    this.services.push({
      caption: 'Cocunut Shrimp',
      alt: 'Shrimp coconut',
      url: 'Food/p4.jpg',
      price: "$13.95"
    });
    this.services.push({
      caption: 'Goat Cheese Chicken',
      alt: 'Goat Cheese Chicken',
      url: 'Food/p5.jpg',
      price: "$13.95" 
      
    });
    this.services.push({
      caption: 'Cocunut Curry Salmon',
      alt: 'Cocunut Curry Salmon',
      url: 'Food/p6.jpg',
      price: "$12.95"
    });
    this.services.push({
      caption: 'Butter Chicken and Veggies',
      alt: 'Butter Chicken and Veggies',
      url: 'Food/p2.jpg',
      price: "$12.00"
    });
    this.services.push({
      caption: 'Keto Cheese Steak',
      alt: 'Keto Cheese Steak',
      url: 'Food/p7.jpg',
      price: "$12.00"
    });
    this.services.push({
      caption: 'Garlic Butter Salmon',
      alt: 'Garlic Butter Salmon',
      url: 'Food/p8.jpg',
      price: "$12.95"
    });
  }

  
  getServices() {
    return this.services;
  }

}

module.exports = ServiceDB;