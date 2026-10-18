import Phaser from 'phaser';

export interface TextButtonOptions {
  fontSize?: number;
  color?: string;
  hoverColor?: string;
  onClick?: () => void;
}

/** 호버/클릭 피드백이 있는 텍스트 버튼 */
export class TextButton extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    options: TextButtonOptions = {},
  ) {
    const { fontSize = 32, color = '#ffffff', hoverColor = '#ffd166', onClick } = options;

    super(scene, x, y, label, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: `${fontSize}px`,
      color,
    });

    this.setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.on(Phaser.Input.Events.POINTER_OVER, () => this.setColor(hoverColor));
    this.on(Phaser.Input.Events.POINTER_OUT, () => this.setColor(color).setScale(1));
    this.on(Phaser.Input.Events.POINTER_DOWN, () => this.setScale(0.95));
    this.on(Phaser.Input.Events.POINTER_UP, () => {
      this.setScale(1);
      onClick?.();
    });

    scene.add.existing(this);
  }
}
