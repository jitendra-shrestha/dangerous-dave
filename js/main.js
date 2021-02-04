const sprite = new Sprite();
let game;
Sprite.image.onload = () => {
  game = new Game("container", { width: 640, height: 385 });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && game.hasGameFinished) {
      const parentElement = document.getElementById(game.containerId);

      while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
      }

      game = new Game("container", { width: 640, height: 385 });
    }
  });
};
