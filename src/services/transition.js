export function transitionIn(view) {
  return view.transitionTo({
    transform: [
      {
        translateX: 0,
      },
    ],
  }, 400);
}

export function transitionOut(view) {
  return view.transitionTo({
    transform: [
      {
        translateX: 360,
      },
    ],
  }, 400);
}

export function transitionMove(view, evt, gesture) {
  if (gesture.moveX > 50 && gesture.dx > 10) {
    view.setNativeProps({
      style: {
        transform: [
          {
            translateX: gesture.dx,
          },
        ],
      },
    });
  }
}

export function transitionRelease(view, evt, gesture) {
  if (gesture.dx > 250 || (gesture.dx > 20 && gesture.vx > 0.5)) {
    view.transition({
      transform: [
        {
          translateX: gesture.dx,
        },
      ],
    }, {
      transform: [
        {
          translateX: 360,
        },
      ],
    }, 200);
  } else if (gesture.dx > 0) {
    view.transition({
      transform: [
        {
          translateX: gesture.dx,
        },
      ],
    }, {
      transform: [
        {
          translateX: 0,
        },
      ],
    }, 100);
  }
}
