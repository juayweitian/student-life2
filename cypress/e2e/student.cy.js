describe('Student Management Frontend', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  it('should add a new student', () => {
    // Open the modal and fill in the form
    cy.get('button[data-target="#resourceModal"]').click();
    cy.get('#name').type('Test name', { force: true });
    cy.get('#group').type('Test group', { force: true });
    cy.get('#email').type('test@gmail.com', { force: true });
    
    // Click the add resource button
    cy.get('button.btn-primary').contains('Add New Student').click();
    
    // Verify the resource is in the table
    cy.get('#tableContent').contains('Test name').should('exist');
  });
  
  it('should be unable to update resource - empty fields', () => {
    cy.visit(baseUrl);

    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear()
    cy.get('#editGroup').clear()
    cy.get('#editEmail').clear()

    // Click the update resource button
    cy.get('#updateButton').click();
    
    cy.get('#editMessage').should('be.visible').and('have.text', 'All fields are required!');

    cy.get('#editMessage').should('have.class', 'text-danger');
  });
  
  it('should be unable to update resource - invalid email format', () => {
    cy.visit(baseUrl);

    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    cy.get('#editName').clear().type('Updated Name', { force: true });
    cy.get('#editGroup').clear().type('Updated Group', { force: true });
    cy.get('#editEmail').clear().type('Updated Email', { force: true });

    // Click the update resource button
    cy.get('#updateButton').click();
    
    cy.get('#editMessage').should('be.visible').and('have.text', 'Invalid Email!');

    cy.get('#editMessage').should('have.class', 'text-danger');
  });

  it('should update an existing resource', () => {
    cy.visit(baseUrl);
    
    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    
    // Update resource details
    cy.get('#editName').clear().type('Updated Name', { force: true });
    cy.get('#editGroup').clear().type('Updated Group', { force: true });
    cy.get('#editEmail').clear().type('Updated Email@gmail.com', { force: true });

    // Click the update resource button
    cy.get('#updateButton').click();
    
    // Verify the resource is updated in the table
    cy.get('#tableContent').contains('Updated Name').should('exist');
    cy.get('#tableContent').contains('Test name').should('not.exist');
  });
});
