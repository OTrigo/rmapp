
import api from '../src/services/api';

describe('API Service', () => {
  it('should have the correct base URL', () => {
    expect(api.defaults.baseURL).toBe('https://rickandmortyapi.com/api');
  });
});
