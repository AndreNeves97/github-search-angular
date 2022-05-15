describe('GitHub Search', () => {
  it('Results table should show all  returned itens', () => {
    cy.fixture('users').then((users) => {
      cy.intercept('GET', '/search/users?q=*&page=*&per_page=*', users).as(
        'getUser'
      );
    });

    cy.visit('/');

    cy.get('app-github-search-search-box input[name=searchTerm]').type(
      'andre neves'
    );
    cy.get('app-github-search-search-box  .submit-button').click();

    cy.fixture('users').then((users) => {
      cy.get('tbody tr').should('have.length', users.items.length);
    });
  });
});
