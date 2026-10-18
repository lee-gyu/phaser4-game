import { TextButton } from '@libs/ui';
import Phaser from 'phaser';
import { SceneKeys } from './keys';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height * 0.35, 'Phaser 4 Game', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '64px',
        fontStyle: 'bold',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    new TextButton(this, width / 2, height * 0.6, 'Start', {
      onClick: () => this.scene.start(SceneKeys.Game),
    });

    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start(SceneKeys.Game));
  }
}
