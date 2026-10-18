import Phaser from 'phaser';
import { SceneKeys, TextureKeys } from './keys';

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload(): void {
    const { width, height } = this.scale;
    const barWidth = width * 0.5;

    this.add.rectangle(width / 2, height / 2, barWidth, 12).setStrokeStyle(1, 0xffffff);
    const bar = this.add
      .rectangle(width / 2 - barWidth / 2, height / 2, 0, 8, 0xffffff)
      .setOrigin(0, 0.5);

    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      bar.width = barWidth * progress;
    });

    // 에셋은 game/public/assets 에 두고 아래처럼 로드한다
    this.load.setPath('assets');
    // this.load.image('logo', 'logo.png');
  }

  create(): void {
    this.createPlaceholderTextures();
    this.scene.start(SceneKeys.MainMenu);
  }

  /** 실제 아트가 준비되기 전까지 쓸 임시 텍스처를 코드로 생성 */
  private createPlaceholderTextures(): void {
    const g = this.make.graphics({}, false);

    g.fillStyle(0x4cc9f0).fillRoundedRect(0, 0, 40, 40, 8);
    g.generateTexture(TextureKeys.Player, 40, 40);
    g.clear();

    g.fillStyle(0xffd166).fillCircle(12, 12, 12);
    g.generateTexture(TextureKeys.Coin, 24, 24);

    g.destroy();
  }
}
