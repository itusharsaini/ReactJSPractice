/* eslint-disable no-undef */
describe('Test login page', () => {

    it('Visit login page', () => {

        cy.visit('http://localhost:3000/login');

    });

    describe('Login page contains elements', () => {

        it('Contains Strings Login/Email/Password/Register', () => {

            cy.get('.emailDiv').contains('Email');
            cy.get('.passDiv').contains('Password');

            cy.get('.Login').contains('Login');

            cy.get('.button-div').contains('Login');
            cy.get('.button-div').contains('Register');

            cy.get('.error');

        });

        it('Contains Image Tag', () => {

            cy.get('.imgTag');

        });

    });

    describe('Should login/logout', () => {

        it('Test login', () => {

            cy.get('.email')
                .type('tushar@gmail.com')
                .should('have.value', 'tushar@gmail.com');

            cy.get('.password')
                .type('123456')
                .should('have.value', '123456');

            cy.contains('Login')
                .click();

            cy.url()
                .should('include', '/app');
        });

        it('Test logout', () => {

            cy.url().should('include', '/app');

            cy.get('.header')
                .within(() => {
                    cy.get('h4')
                        .within(() => {
                            cy.get('.btn')
                                .contains('Logout')
                                .click();

                            cy.url()
                                .should('include', '/login');
                        })
                })

        });

    });


    describe('Should not login', () => {

        it('Test with wrong email', () => {

            cy.get('.email')
                .type('12tushar@gmail.com')
                .should('have.value', '12tushar@gmail.com');

            cy.get('.password')
                .type('123456')
                .should('have.value', '123456');

            cy.contains('Login')
                .click();

            cy.get('.error')
                .within(() => {
                    cy.get('p')
                        .contains('There is no user record corresponding to this identifier. The user may have been deleted.');
                })

            cy.url()
                .should('include', '/login');
        });


        it('Testin with wrong password', () => {

            cy.get('.email').clear()
                .type('tushar@gmail.com')
                .should('have.value', 'tushar@gmail.com');

            cy.get('.password').clear()
                .type('1234567')
                .should('have.value', '1234567');

            cy.contains('Login')
                .click();

            cy.get('.error')
                .within(() => {
                    cy.get('p')
                        .contains('There is no user record corresponding to this identifier. The user may have been deleted.');
                })

            cy.url()
                .should('include', '/login');

        });

    });

    describe('Should redirect to registration page on clicking regiter button', () => {

        it('Register Clicked', () => {

            cy.contains('Register')
                .click();

        });

        it('Redirected to registration page', () => {

            cy.url()
                .should('include', '/register');

        });

    });


});