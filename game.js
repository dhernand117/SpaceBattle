const random = (min, max) => Math.random() * (max - min) + min;

class Ship {
  constructor(hull = 20, firepower = 5, accuracy = 0.7) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(target) {
    console.log("Now attacking..");
    let hitChance = Math.random();
    if (hitChance < this.accuracy) {
      target.hull -= this.firepower;
      console.log("Hit!");
    } else {
      console.log("Miss!");
    }
    console.log(`Hull integrity: ${target.hull}`);
  }
}

let playAgain;
do {
    const player = new Ship();
    const alienFleet = [];
    for (let i = 0; i < 6; i++) {
      alienFleet.push(new Ship(random(3, 6), random(2, 4), random(6, 8) / 10));
    }

    console.log("Number of enemies:", alienFleet.length);
    console.log("Starting game...");
    let alien;
    while (alienFleet.length > 0 && player.hull > 0) {
      // player's turn
      alien = alienFleet.shift();
      player.attack(alien);
      if (alien.hull <= 0) {
        console.log("Enemy defeated!");
        continue;
      }

      // alien's turn
      player.attack(player);
      if (player.hull <= 0) {
        console.log("You were defeated!");
        break;
      }
    }
    console.log("Game over!");
    playAgain = prompt("Would you like to play again? (yes/no)");
} while (playAgain === 'yes');
console.log("Thanks for playing!");
