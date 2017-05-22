# WebSlidesAnimation: Animation without page transition

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/release/iwamatsu0430/WebSlidesAnimation.svg)](https://github.com/iwamatsu0430/WebSlidesAnimation/releases/latest)
[![npm version](https://badge.fury.io/js/webslides-animation.svg)](https://badge.fury.io/js/webslides-animation)
[![wercker status](https://app.wercker.com/status/b46bf7c99fb9ddb1eb260f419b4adc4f/s/master "wercker status")](https://app.wercker.com/project/byKey/b46bf7c99fb9ddb1eb260f419b4adc4f)

This is Plug-in for WebSlides. This plug-in adds slide animation without page transition.

![DEMO](demo.gif)

[DEMO Slide](https://iwamatsu0430.github.io/WebSlidesAnimation/example/)

# Download

[v1.0.1](https://github.com/iwamatsu0430/WebSlidesAnimation/releases/download/1.0.1/webslides-animation.js)

# Usage

Add script after webslides.js and call `addWebSlideAnimation`

```
<script src="./webslides.js"></script>
<script src="./webslides-animation.js"></script>
<script>
  window.ws = new WebSlides();
  new WebSlidesAnimation(window.ws);
</script>
```

Add animate stylesheet. use transition or animate;

```
.animate-show {
  display: none !important;
}
.animate-show.animated {
  display: inherit !important;
}

.example-block {
  width: 100px;
  height: 100px;
  position: relative;
  left: 0;
  transition: all 500ms ease;
}
.example-block.animate {
  left: calc(100% - 100px);
}
```

In your slide, Add step controller tag.

```
<section>
  <span data-step-count=3></span>
  <span class="background"></span>
  <header>
    <h1 class="aligncenter">Title</h1>
  </header>
  <div class="wrap">
    <ul class="flexblock">
      <!-- animate first step -->
      <li class="animate-show" data-step=1>
        <p class="aligncenter">FOO</p>
      </li>
      <!-- animate second step -->
      <li class="animate-show" data-step=2>
        <p class="aligncenter">BAR</p>
      </li>
      <!-- animate third step -->
      <li class="animate-show" data-step=3>
        <p class="aligncenter">BAZ</p>
      </li>
    </ul>
  </div>
</section>
```

# Credit

- WebSlidesAnimation was created by [@iwamatsu0430](https://github.com/iwamatsu0430).
- WebSlides was created by [@jlantunez](https://twitter.com/jlantunez) using [Cactus](https://github.com/eudicots/Cactus).
