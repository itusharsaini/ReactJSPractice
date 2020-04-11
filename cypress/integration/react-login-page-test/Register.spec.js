/* eslint-disable no-undef */
describe('Test register page', () => {

    it('On register page', () => {

        cy.visit('http://localhost:3000/login');

        cy.url()
            .should('include', '/login');

        cy.contains('Register')
            .click();

    });

    describe('Register page contains elements', () => {

        it('Contains .form .inputDiv .fullNameDiv .emailDiv .passDiv .imgTag Full Name & Email & Confirm Password & Choose Password', () => {
            cy.url()
                .should('include', '/login');

            cy.contains('Register')
                .click();

            cy.url()
                .should('include', '/register');

            cy.get('.Register')
                .within(() => {
                    cy.get('.form')
                        .within(() => {

                            cy.get('.inputDiv')
                                .within(() => {
                                    cy.get('.fullNameDiv')
                                        .contains('Full Name');

                                    cy.get('.emailDiv')
                                        .contains('Email');

                                    cy.get('.passDiv')
                                        .contains('Choose Password');

                                    cy.get('.passDiv')
                                        .contains('Confirm Password');

                                    cy.get('[name="email"]').clear();

                                    cy.get('[name="password"]');

                                    cy.get('[name="confirmPass"]');

                                    cy.get('.error');

                                });

                            cy.get('.imgTag')
                                .within(() => {
                                    cy.get('img');
                                });
                        });
                });
        });
    });

    describe('Testing inputs', () => {

        it('Should register with an email/password and redirect to ./app', () => {

            cy.get('[name="fullName"]')
                .clear()
                .click()
                .type('John Doe')
                .should('have.value', 'John Doe');

            cy.get('[name="email"]')
                .clear()
                .click()
                .type('tushar12@gmail.com')
                .should('have.value', 'tushar12@gmail.com');

            cy.get('[name="password"]')
                .clear()
                .click()
                .type('Abc@123!')
                .should('have.value', 'Abc@123!');

            cy.get('[name="confirmPass"]')
                .clear()
                .click()
                .type('Abc@123!')
                .should('have.value', 'Abc@123!');

            cy.contains('Register')
                .click();

            cy.url()
                .should('include', '/app');

        });

        it('Shoule return error if email id already registered', () => {

            cy.url()
                .should('include', '/app');

            cy.get('.header')
                .within(() => {
                    cy.get('h4')
                        .contains('Logout')
                        .click();
                });

            cy.url()
                .should('include', '/login');

            cy.contains('Register')
                .click();

            cy.url()
                .should('include', '/register');


            cy.get('[name="fullName"]')
                .clear()
                .click()
                .type('John Doe')
                .should('have.value', 'John Doe');

            cy.get('[name="email"]')
                .clear()
                .click()
                .type('tushar12@gmail.com')
                .should('have.value', 'tushar12@gmail.com');

            cy.get('[name="password"]')
                .clear()
                .click()
                .type('Abc@123!')
                .should('have.value', 'Abc@123!');

            cy.get('[name="confirmPass"]')
                .clear()
                .click()
                .type('Abc@123!')
                .should('have.value', 'Abc@123!');

            cy.contains('Register')
                .click();

            cy.url()
                .should('include', '/register');

            cy.get('.error')
                .within(() => {

                    cy.get('span')
                        .contains('The email address is already in use by another account.');
                });
            cy.pause();

        });

        it('Should not register with an invalid email/password', () => {

            cy.get('[name="email"]')
                .clear()
                .click()
                .type('123@123.com')
                .should('have.value', '123@123.com');

            cy.get('[name="password"]')
                .clear()
                .click()
                .type('123456')
                .should('have.value', '123456');

            cy.get('[name="confirmPass"]')
                .clear()
                .click()
                .type('123456')
                .should('have.value', '123456');

            cy.contains('Register')
                .click();

            cy.url()
                .should('include', '/register');

            cy.get('.error')
                .within(() => {

                    cy.get('span')
                        .contains('The email address is badly formatted.');
                });

        });

    });

});