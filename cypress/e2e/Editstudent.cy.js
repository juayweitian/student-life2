describe('Student Management Frontend', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; 
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer'); 
  });

  it('should be unable to update student - empty fields', () => {
    cy.visit(baseUrl);

    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear()
    cy.get('#editGroup').clear()
    cy.get('#editEmail').clear()

    cy.get('#updateButton').click();
    
    cy.get('#editMessage').should('be.visible').and('have.text', 'All fields are required!');

    cy.get('#editMessage').should('have.class', 'text-danger');
  });
  
  it('should be unable to update student - invalid email format', () => {
    cy.visit(baseUrl);

    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear().type('Updated Name', { force: true });
    cy.get('#editGroup').clear().type('Updated Group', { force: true });
    cy.get('#editEmail').clear().type('Updated Email', { force: true });

    cy.get('#updateButton').click();
    
    cy.get('#editMessage').should('be.visible').and('have.text', 'Invalid Email!');

    cy.get('#editMessage').should('have.class', 'text-danger');
  });

  it('should be unable to update student - invalid group input length', () => {
    cy.visit(baseUrl);

    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear().type('Updated Name', { force: true });
    cy.get('#editGroup').clear().type('Updated Group testing', { force: true });
    cy.get('#editEmail').clear().type('Updated test@gmail.com', { force: true });

    cy.get('#updateButton').click();
    
    cy.get('#editMessage').should('be.visible').and('have.text', 'Invalid group input length!');

    cy.get('#editMessage').should('have.class', 'text-danger');
  });

  it('should be unable to update student - invalid group input characters', () => {
    cy.visit(baseUrl);

    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear().type('Updated Name', { force: true });
    cy.get('#editGroup').clear().type('#$', { force: true });
    cy.get('#editEmail').clear().type('Updated test@gmail.com', { force: true });

    cy.get('#updateButton').click();
    
    cy.get('#editMessage').should('be.visible').and('have.text', 'Invalid group input characters!');

    cy.get('#editMessage').should('have.class', 'text-danger');
  });

  it('should update an existing student', () => {
    cy.visit(baseUrl);
    
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear().type('Updated Name', { force: true });
    cy.get('#editGroup').clear().type('Updated Group', { force: true });
    cy.get('#editEmail').clear().type('Updated test@gmail.com', { force: true });

    cy.get('#updateButton').click();
    
    cy.get('#tableContent').contains('Updated Name').should('exist');
    cy.get('#tableContent').contains('Test name').should('not.exist');
  });
});
