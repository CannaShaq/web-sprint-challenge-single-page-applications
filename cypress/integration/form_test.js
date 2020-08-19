describe("Testing form inputs", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/form");
    });
    it("add text to input", function(){
        cy.get('[data-cy="name"')
        .type("Lili")
        .should("have.value", "Lili");
    });

    it("Check sizeOf input", function(){
        cy.get('#sizeChoice')
        .select("SMALL")
        .should("have.value", "SMALL");
    });

    it("Check special order text area", function(){
        cy.get('#specialInstructions')
        .type("This is a special order test")
        .should("have.value", "This is a special order test");
    });

    it("Check pepperoni selection", function(){
        cy.get('#pepperoni')
        .check()
        .should("be.enabled");
    });

    it("Check sausage selection", function(){
        cy.get('#sausage')
        .check()
        .should("be.enabled");
    });

    it("Check cBacon selection", function(){
        cy.get('#cBacon')
        .check()
        .should("be.enabled");
    });

    it("Check submit button", function(){
        cy.get('[data-cy="name"')
        .type("Lili")
        .should("have.value", "Lili");

        cy.get('#cBacon')
        .check()
        .should("be.enabled");

        cy.get('#sizeChoice')
        .select("SMALL")
        .should("have.value", "SMALL");

        cy.get('#garlic')
        .check();

        cy.get('[data-cy=submit]')
        .click();
    })

});