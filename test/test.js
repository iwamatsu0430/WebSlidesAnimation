const WebSlidesAnimation = require('../webslides-animation');
const assert = require('assert');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;

const createWebSlidesAnimation = (frag) => {
  const wsa = new WebSlidesAnimation({
    goNext: () => {},
    el: {
      addEventListener: () => {},
      dispatchEvent: () => {}
    },
    currentSlideI_: 0
  });
  wsa.createEvent = () => {};
  wsa.createCustomEvent = () => {};
  wsa.document = frag;
  return wsa;
};

describe('#getTargetSection', () => {

  it('find section by id', () => {
    const frag = JSDOM.fragment(`<section id="section-1"></secion>`);
    const wsa = createWebSlidesAnimation(frag);
    const targetSection = wsa.getTargetSection();
    assert.equal(targetSection.id, 'section-1');
  });

  it('not found section by id', () => {
    const frag = JSDOM.fragment(`<section id="section-2"></secion>`);
    const wsa = createWebSlidesAnimation(frag);
    const targetSection = wsa.getTargetSection();
    assert.equal(targetSection, null);
  });
});

describe('#findStepInfo', () => {

  it('return info (has step count)', () => {
    const frag = JSDOM.fragment(`<section id="section-1"><span data-step-count=3></span></secion>`);
    const wsa = createWebSlidesAnimation(frag);
    const targetSection = wsa.getTargetSection();
    const stepInfo = wsa.findStepInfo(targetSection);
    assert.equal(stepInfo.getMaxStep(), 3);
    assert.equal(stepInfo.getCurrentStep(), 0);
  });

  it('return info (has step count, current step)', () => {
    const frag = JSDOM.fragment(`<section id="section-1"><span data-step-count=3 data-current=2></span></secion>`);
    const wsa = createWebSlidesAnimation(frag);
    const targetSection = wsa.getTargetSection();
    const stepInfo = wsa.findStepInfo(targetSection);
    assert.equal(stepInfo.getMaxStep(), 3);
    assert.equal(stepInfo.getCurrentStep(), 2);
  });

  it('return info (not have step count)', () => {
    const frag = JSDOM.fragment(`<section id="section-1"></secion>`);
    const wsa = createWebSlidesAnimation(frag);
    const targetSection = wsa.getTargetSection();
    const stepInfo = wsa.findStepInfo(targetSection);
    assert.equal(stepInfo.getMaxStep(), 0);
    assert.equal(stepInfo.getCurrentStep(), 0);
  });

  it('return info (not exists section)', () => {
    const frag = JSDOM.fragment(``);
    const wsa = createWebSlidesAnimation(frag);
    const targetSection = wsa.getTargetSection();
    const stepInfo = wsa.findStepInfo(targetSection);
    assert.equal(stepInfo.getMaxStep(), 0);
    assert.equal(stepInfo.getCurrentStep(), 0);
  });
});

describe('#onSlideChange', () => {

  var isPassed = false;

  const wsa = createWebSlidesAnimation();
  wsa.getTargetSection = () => {};
  wsa.overrideGoNext = () => {
    isPassed = true
    return () => {};
  };

  it('call overrideGoNext when maxCount > 0', () => {
    isPassed = false;
    wsa.findStepInfo = () => {
      return {
        getMaxStep: () => 1
      };
    };
    wsa.onSlideChange();
    assert.equal(isPassed, true);
  });

  it('not call overrideGoNext when maxCount = 0', () => {
    isPassed = false;
    wsa.findStepInfo = () => {
      return {
        getMaxStep: () => 0
      };
    };
    wsa.onSlideChange();
    assert.equal(isPassed, false);
  });
});

describe('#overrideGoNext', () => {

  const frag = JSDOM.fragment(`
<section id="section-1">
<div data-step=1></div>
<p class="foo" data-step=2></p>
</secion>`);
  const wsa = createWebSlidesAnimation(frag);
  const targetSection = wsa.getTargetSection();
  wsa.getTargetSection = () => {
    return targetSection;
  };

  it('add animated class only step target', () => {
    wsa.overrideGoNext(targetSection)();
    const div = frag.querySelector('div');
    const p = frag.querySelector('p');
    assert.equal(div.classList.contains('animated'), true);
    assert.equal(p.classList.contains('animated'), false);
  });
});

describe('#onResetStep', () => {

  const frag = JSDOM.fragment(`
<section id="section-1">
<div class="animated" data-step=1></div>
<p class="animated foo" data-step=2></p>
</secion>`);
  const wsa = createWebSlidesAnimation(frag);
  const targetSection = wsa.getTargetSection();
  wsa.getTargetSection = () => {
    return targetSection;
  };

  it('clear all animated class', () => {
    wsa.onResetStep();
    const div = frag.querySelector('div');
    const p = frag.querySelector('p');
    assert.equal(div.classList.contains('animated'), false);
    assert.equal(p.classList.contains('animated'), false);
  });

  it('not clear other classes', () => {
    wsa.onResetStep();
    const p = frag.querySelector('p');
    assert.equal(p.classList.contains('foo'), true);
  });
});
