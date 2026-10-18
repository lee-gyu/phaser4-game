import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { PreloaderScene } from './scenes/PreloaderScene';

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#1d1f27',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: import.meta.env.DEV && new URLSearchParams(location.search).has('debug'),
    },
  },
  // 배열 첫 번째 씬이 자동 시작된다
  scene: [PreloaderScene, MainMenuScene, GameScene],
};
