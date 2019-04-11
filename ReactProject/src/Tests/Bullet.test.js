import { Bullet } from '../PhaserGame/gameObjects/Projectiles';
import PlayerScene, { PlayScene } from '../PhaserGame/scenes/PlayScene';
import Phaser from 'phaser';
jest.mock('phaser');
jest.mock('../PhaserGame/scenes/PlayScene');




test('Testing Bullet Constructor and default values', () => {
    const bulletSpeed = 1;
    const bullet = new Bullet(new PlayScene(),bulletSpeed);

    expect(bullet.speed).toBe(bulletSpeed);
    expect(bullet.angle).toBe(20);
    expect(bullet.xSpeed).toBe(bulletSpeed);
    expect(bullet.ySpeed).toBe(bulletSpeed);
    expect(bullet.timeAlive).toBe(0);
});

test('Testing speed Changes in shoot function for bullet class', () => {
    const speed = 10;
    const shooter = {
      x:100,
      y:200,
      body:{
        rotation: 1
      }
    };

    const velocityArray = [
      { newVel: { x: 1, y: 1 }, correctXSpeed: speed, correctYSpeed: speed },
      { newVel: { x: -1, y: 1 }, correctXSpeed: -speed, correctYSpeed: speed },
      { newVel: { x: 1, y: -1 }, correctXSpeed: speed, correctYSpeed: -speed },
      { newVel: { x: -1, y: -1 }, correctXSpeed: -speed, correctYSpeed: -speed }];

    const bullet = new Bullet(new PlayScene(),speed);
    
    velocityArray.forEach((velocity)=>{

      bullet.shoot(shooter,velocity.newVel);
      expect(bullet.xSpeed).toBe(velocity.correctXSpeed);
      expect(bullet.ySpeed).toBe(velocity.correctYSpeed);

    });

  
});

test('Testing the update class for the bullet',()=>{
  const speed = 10;
  const bullet = new Bullet(new PlayScene(),speed);
  bullet.update(1,100);
  expect(bullet.timeAlive).toBe(100);
});