const addWebSlideAnimation = function(ws) {

  const goNextOrigin = ws.goNext;

  const eventNames = {
    slideChange: 'ws:slide-change',
    goNextStep: 'ws:slide-go-next-step',
    resetStep: 'ws:slide-reset'
  };

  const classNames = {
    animated: 'animated'
  };

  const attributeNames = {
    maxStep: 'data-step-count',
    currentStep: 'data-current',
    step: 'data-step'
  };

  const getTargetSection = function() {
    return document.querySelector('#section-' + (ws.currentSlideI_ + 1));
  };

  const resetCurrentSlide = function() {
    ws.goNext = goNextOrigin;
    ws.el.dispatchEvent(new Event(eventNames.resetStep));
  };

  const findStepInfo = function(targetSection) {
    const infoElement = targetSection.querySelector('*[' + attributeNames.maxStep + ']');
    return {
      getMaxStep: function() {
        return infoElement && infoElement.hasAttribute(attributeNames.maxStep) ? Number(infoElement.getAttribute(attributeNames.maxStep)) : 0;
      },
      getCurrentStep: function() {
        return infoElement && infoElement.hasAttribute(attributeNames.currentStep) ? Number(infoElement.getAttribute(attributeNames.currentStep)) : 0;
      },
      setCurrentStep: function(nextStep) {
        if (infoElement) {
          infoElement.setAttribute(attributeNames.currentStep, nextStep);
        }
      }
    };
  }

  const onSlideChange = function() {
    resetCurrentSlide();
    const targetSection = getTargetSection();
    const stepInfo = findStepInfo(targetSection);
    if (stepInfo.getMaxStep() > 0) ws.goNext = overrideGoNext(targetSection);
  };

  const overrideGoNext = function(targetSection) {
    return function() {
      const stepInfo = findStepInfo(targetSection);
      const maxStep = stepInfo.getMaxStep();
      const nextStep = stepInfo.getCurrentStep() + 1;

      ws.el.dispatchEvent(new CustomEvent(eventNames.goNextStep, {detail: {
        targetSection: targetSection,
        currentStep: nextStep,
        maxStep: maxStep
      }}));
      targetSection
        .querySelectorAll('*[' + attributeNames.step + '="' + nextStep + '"]')
        .forEach(function(target) {
          target.classList.add(classNames.animated);
        });
      if (nextStep >= maxStep) {
        ws.goNext = goNextOrigin;
      }
      stepInfo.setCurrentStep(nextStep);
    };
  }

  const onResetStep = function(e) {
    const targetSection = getTargetSection();
    const stepInfo = findStepInfo(targetSection);
    stepInfo.setCurrentStep(0);
    targetSection
      .querySelectorAll('*[' + attributeNames.step + '].' + classNames.animated)
      .forEach(function(target) {
        target.classList.remove(classNames.animated);
      });
  };

  ws.el.addEventListener(eventNames.slideChange, onSlideChange);
  ws.el.addEventListener(eventNames.resetStep, onResetStep);

  onSlideChange();
};
