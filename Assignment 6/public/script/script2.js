const images = [
    {
      caption: 'Detox',
      alt: 'Detox',
      url:'meal/detox.jpg',
      des:"Designed to eliminate toxins from your body. detox diets eliminate processed foods.",
      price:"Starts from $160",
      meal: "12",
      Synopsis: "Mostly includes fruits"   },
    
    {
      caption: 'Weight Loss',
      alt: 'Weight Loss',
      url:
      'meal/weightloss.jpg',
      des:"High protein, low-calorie meals with a nutrient profile tuned for weight loss"  ,
      price:"Starts from $180",
      meal: "12" ,
      Synopsis: "Excludes food contains fat"  },
    {
      caption: 'Vegan',
      alt: 'Vegan',
      url:
      'meal/vegan.jpg',
      des:"A fully plant-based package featuring vegan meat and no animal products" ,
      price:"Starts from $140" ,
      meal: "12" ,
      Synopsis: "Excludes non-veg"  },
    {
      caption: 'Fat Burn',
      alt: 'Fat burn',
      url:
      'meal/fatburn.jpg' ,
      des:"Low carb, nutrient-rich meals with fat-burning profiles to support fat loss",
      price:"Starts from $190"  ,
      meal: "12",
      Synopsis: "Includes low carb food"  },
      
    
     
  ];


  
   
    function package(){
    let figure="<figure>";
  
  
    for(var i=0; i<images.length;i++)
    {
      figure += "<div>"+"<img src='" + images[i].url + "'" + "alt='" + images[i].alt +  "'>" + "<p style = color:black>"+images[i].caption + "</p>" +"<p>"+images[i].des + "</p>" +"</p>" +"<p>"+images[i].price + "<br> ( Includes "+images[i].meal+" Meals )"+"</p>"+"<p style=color:green>"+images[i].Synopsis +"</div>" ;
    }
    figure= figure+"</figure>";
   
  return figure;
  }
  document.getElementById("package").innerHTML=package();


  

