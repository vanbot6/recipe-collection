import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

test('As a Chef, I want to store my recipes so that I can keep track of them.', () => {
  render(<App />);

  let recipeHeader = screen.getByText('My Recipes');
  expect(recipeHeader).toBeInTheDocument();

  let recipeList = screen.getByText('There are no recipes to list.');
  expect(recipeList).toBeInTheDocument();
  expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
});

test("contains an add recipe button", () => {
  render(<App />);

  let recipeHeader = screen.getByText('My Recipes');
  let button = screen.getByRole('button', { name: 'Add Recipe' });
  
  expect(button).toBeInTheDocument();
  expect(recipeHeader.compareDocumentPosition(button)).toBe(4);
});

test("contains an add recipe button that when clicked opens a form", async () => {
  render(<App />);

  let button = screen.getByRole('button', { name: 'Add Recipe' });
  userEvent.click(button);

  let form = await screen.findByRole('form');
  expect(form).toBeInTheDocument();

  // Match the labels exactly or use regex for flexibility
  expect(screen.getByLabelText(/Recipe name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Instructions/i)).toBeInTheDocument();

  button = screen.queryByRole('button', { name: 'Add Recipe' });
  expect(button).toBeNull();
});

test("shows new recipe after adding", async () => {
  render(<App />);

  // Add recipe
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  // wait for the form/textbox to appear, used findBy because it returns a promise
  let recipeNameBox = await screen.findByLabelText(/Recipe name/i);
  let recipeInstructionBox = screen.getByLabelText(/Instructions/i);

  // add recipe
  const recipeName = 'Tofu Scramble Tacos';
  const recipeInstructions = "1. heat a skillet on medium with a dollop of coconut oil\n2. warm flour tortillas";
  userEvent.type(recipeNameBox, recipeName);
  userEvent.type(recipeInstructionBox, recipeInstructions);

  // click the submit button
  let submitButton = screen.getByRole('button', {name: 'Submit'});
  userEvent.click(submitButton);

  // wait for text to appear, a timeout means it was never found
  let recipe = await screen.findByText(recipeName);
  expect(recipe).toBeInTheDocument();
});