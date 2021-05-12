import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import { CountryProvider } from '../../context/CountryContext';

import { countries } from '../../../fixtures';

const renderComponent = () =>
  render(
    <CountryProvider>
      <Home />
    </CountryProvider>,
  );

describe('Home', () => {
  describe('when it renders', () => {
    it('calls the API and render the cards', async () => {
      renderComponent();

      await screen.findByText(/Brasil/i);
      await screen.findByText(/São Paulo/i);
      await screen.findByText(/12\/2022/i);
    });
  });

  describe('when deleting a country', () => {
    it('removes the country card', async () => {
      renderComponent();
      await screen.findByText(/Brasil/i);

      userEvent.click(screen.getByTestId(`delete-${countries[0].id}`));

      await waitFor(() => {
        expect(screen.queryByText('Brasil')).not.toBeInTheDocument();
      });
    });
  });

  // describe('when adding a new country', () => {
  //   describe('with valid data', () => {
  //     it('adds a new country', async () => {
  //       const { debug } = renderComponent();

  //       const placeField = screen.getByPlaceholderText(
  //         'Digite o local que deseja conhecer',
  //       );

  //       const goalDate = screen.getByLabelText('Meta');

  //       expect(placeField).toBeInTheDocument();

  //       await userEvent.type(placeField, 'Bahia');
  //       console.log(placeField);

  //       userEvent.type(goalDate, '112027');

  //       userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

  //       await waitFor(() =>
  //         expect(screen.getByText('Bahia')).toBeInTheDocument(),
  //       );
  //     });
  //   });
  // });

  describe('when updating a country', () => {
    it('diplays the the card with the updated data', async () => {
      const { debug } = renderComponent();

      await screen.findByText(/São Paulo/i);

      userEvent.click(screen.getByTestId(`edit-${countries[0].id}`));

      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'editar' })),
      );

      const placeField = screen.getByTestId('edit-place-field');

      const goalField = screen.getByTestId('edit-goal-field');

      userEvent.type(placeField, 'Bahia');
      userEvent.type(goalField, '102022');

      userEvent.click(screen.getByRole('button', { name: 'editar' }));

      await waitFor(() => expect(screen.getByText('Bahia')));

      debug();
    });
  });
});
