//create an array
let particle; // Fix variable name (from "particl" to "particle")

function gravitationalForce(centerX, centerY, a, b) {
    let force = createVector(b.pos.x - a.pos.x, b.pos.y - a.pos.y); // Fix force calculation
    let distance = force.mag();
    if (distance > 0.0001){
        // force.setMag(0);
        force.setMag((a.mass * b.mass) / (distance * distance));
    }

    a.acc.add(force); // Fix the reference to acceleration (from "this.acc" to "a.acc")
    b.acc.sub(force); // Subtract force from b to satisfy Newton's third law
}

function mousePressed() {
    for (let i = 0; i < particle.length; i++) {
        particle[i].pos.x = random(0, windowWidth * 0.7);
        particle[i].pos.y = random(0, windowHeight * 0.7);
    }
}

function setup() {
    createCanvas(windowWidth-10, windowHeight-10);


    particle = new Array(10); // Fix variable name (from "particle" to "particle")
    for (let i = 0; i < particle.length; i++) {
        let x_in = random(0, windowWidth * 0.7);
        let y_in = random(0, windowHeight * 0.7);
        particle[i] = new Particle(x_in, y_in);
    }
}

function draw() {
    background(0, 0, 0);

    //show the 100 particles
    for (let i = 0; i < particle.length; i++) {
        particle[i].show();
    }

    //compute the gravitational force between the particles
    for (let i = 0; i < particle.length; i++) {
        for (let j = 0; j < particle.length; j++) {
            if (i != j) {
                gravitationalForce(
                    windowWidth * 0.7 / 2,
                    windowHeight * 0.7 / 2,
                    particle[i],
                    particle[j]
                );
            }
        }
    }

    //update the particles
    for (let i = 0; i < particle.length; i++) {
        particle[i].update();
    }

    //update the previous position of the particles
    for (let i = 0; i < particle.length; i++) {
        particle[i].updatePrev();
    }

    //draw the center of the screen
    fill(255, 0, 0);
    ellipse((windowWidth-10) /2, (windowHeight-10) /2, 10, 10);

    //draw the border of the screen
    strokeWeight(1);
    noFill();
    rect(0, 0, windowWidth * 0.7, windowHeight * 0.7);

    //draw the text
    fill(255, 255, 255);
    textSize(20);
    text("Particles", 10, 30);
    textSize(10);
    text("By: @faunofobici", 10, 45);
    text("Click to reset", 10, 60);
    
}
