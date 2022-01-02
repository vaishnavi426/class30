const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit, fruit_con;

var bgImg, rabbitImg, rabbit, foodImg, button1;

function preload() {
  bgImg = loadImage("background.png");
  rabbitImg = loadImage("Rabbit-01.png");
  foodImg = loadImage("melon.png");
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = new Ground(250,690,600,20);

  rope = new Rope(6,{x:245,y:30})

  var options = {
    density: 0.001
  }
  fruit = Bodies.circle(300,300,15,options);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  imageMode(CENTER);

  rabbit = createSprite(250,625,100,100);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.2;

  button1 = createImg("cut_button.png");
  button1.position(230,30);
  button1.size(25,25);
  button1.mouseClicked(drop);
}

function draw() 
{
  background(51);
  image(bgImg,width/2,height/2,width,height);
  Engine.update(engine);
  
  ground.display();
  rope.show();
  image(foodImg,fruit.position.x,fruit.position.y,60,60);

  rabbit.x = mouseX;

  drawSprites();
}

function drop() {
  rabbit.x = fruit.x;
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}