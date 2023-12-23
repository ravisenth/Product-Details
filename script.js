// fetching data from API

async function fetchData() {
    try {
      const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  //  Assigning image data

  async function imageurl(){
  const a=await fetchData();
  const thamb_img1=a.product.images[0].src;
  var myImage=document.getElementById('main_imagedis');
  myImage.src=thamb_img1;

  // const d=a.product.images[0].src;
  const thamb_img2=a.product.images[1].src;
  const thamb_img3=a.product.images[2].src;
  const thamb_img4=a.product.images[3].src;

  let myImage1=document.getElementById('thambnail_image1');
  myImage1.src=thamb_img1;
  let myImage2=document.getElementById('thambnail_image2');
  myImage2.src=thamb_img2;
  let myImage3=document.getElementById('thambnail_image3');
  myImage3.src=thamb_img3;
  let myImage4=document.getElementById('thambnail_image4');
  myImage4.src=thamb_img4;
 
  // thambnail images will load in the main image addEventListener

  myImage1.addEventListener('click', () => setMainImageSrc(a.product.images[0].src));
  myImage2.addEventListener('click', () => setMainImageSrc(a.product.images[1].src));
  myImage3.addEventListener('click', () => setMainImageSrc(a.product.images[2].src));
  myImage4.addEventListener('click', () => setMainImageSrc(a.product.images[3].src));
     
    //  Choose a color section with outline

  let bgcolor=a.product.options[0].values;
  // console.log(Object.values(bgcolor[0]));
  // console.log(bgcolor);
  let arr=[];
  for(i=0;i<bgcolor.length;i++){
    arr.push(Object.values(bgcolor[i]));
    console.log(arr);
   document.getElementById('box1').style.background=arr[0];
   document.getElementById('box1').style.outline='2px solid'+arr[0];
   document.getElementById('box2').style.background=arr[1];
   document.getElementById('box2').style.outline='2px solid'+arr[1];
   document.getElementById('box3').style.background=arr[2];
   document.getElementById('box3').style.outline='2px solid'+arr[2];
   document.getElementById('box4').style.background=arr[3];
   document.getElementById('box4').style.outline='2px solid'+arr[3];
  }

  // Choose a size section

  let m=a.product.options[1].values
  console.log(m);
  document.getElementById('size1').innerHTML=m[0];

  document.getElementById('size2').innerHTML=m[1];
  document.getElementById('size3').innerHTML=m[2];
  document.getElementById('size4').innerHTML=m[3];
  document.getElementById('size5').innerHTML=m[4];

  // Product Description

  let description=a.product.description;
  document.getElementById('description').innerHTML=description;

  // Add to Cart Count 

  let count=1;
  let incre=document.getElementById('plus');
  let decre=document.getElementById('minus');
  incre.addEventListener('click', ()=>setCount(count++));
  decre.addEventListener('click', ()=>setCount(count>1?count-=1:count))
 }
 
  imageurl();

  //  Thambnail image to Main Image
  async function setMainImageSrc(src){
    const k=await fetchData();
    const mainImage=document.getElementById('main_imagedis');
    mainImage.src=src || k.product.images[0].src ;
  }
  setMainImageSrc();

  // Product details fetching

  async function details(){
    const l=await fetchData();
    let vendor=l.product.vendor;
    let title=l.product.title;
    let price=l.product.price;
    let int_price=price.slice(1);
    console.log(int_price);
    let mrp=l.product.compare_at_price;
    let int_mrp=mrp.slice(1);
    document.getElementById('vendor').innerHTML=vendor;
    document.getElementById('title').innerHTML=title;
    document.getElementById('price').innerHTML=price;
    document.getElementById('offer').innerHTML=Math.round(100-Number((int_price)/(int_mrp))*100)+'%';
    document.getElementById('mrp').innerHTML=mrp;
  }
  details();


    // Add to Cart count method

  async function setCount(count){
    const o=await fetchData();
    document.getElementById('count').innerHTML=count || 1;
  }
  setCount();
