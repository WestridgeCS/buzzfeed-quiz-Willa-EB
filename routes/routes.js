import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('quiz', {
    title: 'Buzzfeed Quiz',
    step: 1,
    state: {},
    outcome: null
  });
});

router.post('/quiz', (req, res) => {
  const body = req.body || {};
  const state = {
    emotion: body.emotion || '',
    priority: body.priority || '',
    food: body.food || ''
  };

  let step = 1;
  if (state.emotion && !state.priority && !state.food) step = 2;
  if (state.emotion && state.priority && !state.food) step = 3;
  if (state.emotion && state.priority && state.food) step = 4;

  let outcome = null;

  if (step === 4) {
    outcome = getOutcome (state)
  }
  res.render('quiz', {
    title: 'Quiz Question',
    step,
    state,
    outcome
  });
});

function getOutcome({ emotion, priority, food }) {
  if (emotion === 'emotionally' && priority === 'fortune' && food=== 'bread') {
    return {
      heading: 'Difficult Cat',
      text: 'You are extremely difficult and picky when it comes to food/'
    };
  }
  else if (emotion === 'content' && priority=== 'family' && food=== 'spaghetti'){
    return {
      heading: 'Fluffy Kitten',
      text: 'Objectively the cutest and the most innocent.'
    }
  }
  else if (emotion === 'emotionally' && priority==='love' && food=== 'bread')  {
    return {
      heading: 'Mid-life Crisis Cat',
      text: 'I hope life gets easier for you soon.'
    }
  }
  else if (emotion=== 'content' && priority=== 'fame' && food=== 'pancakes'){
    return {
      heading: 'Flying Cat',
      text: 'Keep living life to the fullest!'
    }
  }
  else if (emotion=== 'hungry' && priority=== 'fortune' && food=== 'fillet'){
    return {
      heading: 'Hungry Cat',
      text: 'Get some chow!'
    }
  }
  else if (emotion=== 'content' && priority=== 'fortune' && food=== 'fillet') {
    return {
      heading: 'Loaded Cat',
      text: 'Start kneading that dough!'
    }
  }
  return {
    heading: 'Boring',
    text: 'Get a personality and try again!'
  };
}