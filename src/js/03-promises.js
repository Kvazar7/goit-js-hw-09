import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const submitBtn = document.querySelector('button');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

submitBtn.addEventListener('click', onSubmitBtnClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onSubmitBtnClick(evt) {
  evt.preventDefault();
  let delayInput = +delay.value;
  let stepInput = +step.value;
  let amountInput = +amount.value;
  for (let position = 1; position <= amountInput; position += 1) {
    createPromise(position, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })
    delayInput += stepInput;
  }
};