import { createRng, type Rng } from '@libs/core';
import Phaser from 'phaser';
import { SceneKeys, TextureKeys } from './keys';

const PLAYER_SPEED = 280;
const COIN_COUNT = 8;

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private scoreText!: Phaser.GameObjects.Text;
  private rng!: Rng;
  private score = 0;

  constructor() {
    super(SceneKeys.Game);
  }

  // 씬 인스턴스는 재시작 시 재사용되므로 상태 초기화는 create()가 아닌 init()에서
  init(): void {
    this.score = 0;
    this.rng = createRng(Date.now());
  }

  create(): void {
    const { width, height } = this.scale;

    this.player = this.physics.add.sprite(width / 2, height / 2, TextureKeys.Player);
    this.player.setCollideWorldBounds(true);

    this.coins = this.physics.add.staticGroup();
    for (let i = 0; i < COIN_COUNT; i++) this.spawnCoin();

    this.physics.add.overlap(this.player, this.coins, (_player, coin) => {
      this.collectCoin(coin as Phaser.Physics.Arcade.Sprite);
    });

    this.scoreText = this.add.text(16, 16, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
    });
    this.updateScoreText();

    this.add
      .text(width - 16, 16, '방향키: 이동 · ESC: 메뉴', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        color: '#8b8fa3',
      })
      .setOrigin(1, 0);

    const keyboard = this.input.keyboard!;
    this.cursors = keyboard.createCursorKeys();
    keyboard.once('keydown-ESC', () => this.scene.start(SceneKeys.MainMenu));
  }

  override update(): void {
    const { left, right, up, down } = this.cursors;
    const dx = Number(right.isDown) - Number(left.isDown);
    const dy = Number(down.isDown) - Number(up.isDown);

    // 대각선 이동이 더 빨라지지 않도록 정규화
    this.player.body.velocity.set(dx, dy).normalize().scale(PLAYER_SPEED);
  }

  private spawnCoin(): void {
    const { width, height } = this.scale;
    const margin = 40;
    this.coins.create(
      this.rng.int(margin, width - margin),
      this.rng.int(margin + 40, height - margin),
      TextureKeys.Coin,
    );
  }

  private collectCoin(coin: Phaser.Physics.Arcade.Sprite): void {
    this.coins.remove(coin, true, true);
    this.score += 1;
    this.updateScoreText();
    this.spawnCoin();
  }

  private updateScoreText(): void {
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
