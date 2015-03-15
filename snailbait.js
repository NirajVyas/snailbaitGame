var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d'),

    //constants

    PLATFORM_HEIGHT = 8,
    PLATFORM_STROKE_WIDTH = 8,
    PLATFORM_STROKE_HEIGHT = 2,
    PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

    STARTING_RUNNER_LEFT = 50,
    STARTING_RUNNER_TRACK = 1,

    // track baselines

    TRACK_1_BASELINE = 323,
    TRACK_2_BASELINE = 223,
    TRACK_3_BASELINE = 123,

    //Images

    background = new Image(),
    runnerImage = new Image(), 

    // Platforms.........................................................

    platformData = [
      // Screen 1.......................................................
      {
         left:      10,
         width:     210,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200, 200, 60)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {  left:      240,
         width:     110,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(110,150,255)',
         opacity:   1.0,
         track:     2,
         pulsate:   false,
      },

      {  left:      400,
         width:     125,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(250,0,0)',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      623,
         width:     250,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(255,255,0)',
         opacity:   0.8,
         track:     1,
         pulsate:   false,
      },
  ];

  //Launh game

  initializeImages();

  function initializeImages() {
    background.src = 'images/background_level_one_dark_red.png';
    runnerImage.src = 'images/runner-small.png';

    background.onload = function(e) {
      startGame();
    };
  }

  function startGame() {
    draw();
  }

  function draw() {
    drawBackground();
    drawPlatforms();
    drawRunner(); 
  }

  function drawBackground() {
    context.drawImage(background, 0, 0);
  };

  function drawPlatforms() {
    var data,
        platformTop,
        index;

    context.save();

    for (index = 0; index < platformData.length; ++index) {
      data = platformData[index];
      platformTop = calculatePlatformTop(data.track);

      context.lineWidth = PLATFORM_STROKE_WIDTH;
      context.strokeStyle = PLATFORM_STROKE_STYLE;
      context.fillStyle = data.fillStyle;
      context.globalAlpha = data.opacity;

      context.strokeRect(data.left, platformTop, data.width, data.height)
      context.fillRect  (data.left, platformTop, data.width, data.height)
    }

    context.restore();  
  }

  function calculatePlatformTop(track) {
    var top;

    if      (track === 1) { top = TRACK_1_BASELINE; } //323
    else if (track === 2) { top = TRACK_2_BASELINE; } //223
    else if (track === 3) { top = TRACK_3_BASELINE; } //123

    return top;       
  }

  function drawRunner() {
    context.drawImage(runnerImage,
      STARTING_RUNNER_TRACK,
      calculatePlatformTop(STARTING_RUNNER_TRACK) - runnerImage.height);
  }




