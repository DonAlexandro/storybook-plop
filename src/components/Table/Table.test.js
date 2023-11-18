import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  it('should be defined', () => {
    render(<Table/>)

    expect(screen.getByText(`Hi! I'm your new component!`)).toBeInTheDocument()
  })
})
