
class packageDB {

  services = [];


  constructor() {
    this.services.push({
      caption: 'Detox',
      alt: 'Detox',
      url: 'meal/detox.jpg',
      des: "Designed to eliminate toxins from body. detox diets eliminate processed foods.",
      price: "Starts from $160",
      meal: "12",
      Synopsis: "Mostly includes fruits",
      isTop: false

    });
    this.services.push({
      caption: 'Weight Loss',
      alt: 'Weight Loss',
      url: 'meal/weightloss.jpg',
      des: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
      price: "Starts from $180",
      meal: "12",
      Synopsis: "Excludes food contains fat",
      isTop: true
    });
    this.services.push({
      caption: 'Vegan',
      alt: 'Vegan',
      url: 'meal/vegan.jpg',
      des: "A fully plant-based package featuring vegan meat and no animal products",
      price: "Starts from $140",
      meal: "11",
      Synopsis: "Excludes non-veg",
      isTop: false
    });
    this.services.push({
      caption: 'Fat Burn',
      alt: 'Fat burn',
      url: 'meal/fatburn.jpg',
      des: "Low carb, nutrient-rich meals with fat-burning profiles to support fat loss",
      price: "Starts from $190",
      meal: "13",
      Synopsis: "Includes low carb food",
      isTop: true
      
    });


  }

  getPackages() {
    return this.services;
  }



  getTopmeals() {
    const Top = [];
    this.services.forEach((ele) => {
      if (ele.isTop == true) {
        Top.push({
          caption: ele.caption,
          alt: ele.alt,
          url: ele.url,
          des: ele.des,
          price: ele.price,
          meal: ele.meal,
          Synopsis: ele.Synopsis
        });
      }
    })
    return Top;
  }

}

module.exports = packageDB;
