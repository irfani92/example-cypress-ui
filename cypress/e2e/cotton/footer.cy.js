import rgbHex from 'rgb-hex';
describe('Footer', () => { 
  describe('Memastikan bahwa footer website sesuai dengan desain dan berhasil direct ke halaman yang dimaksud ketika diklik', () => { 
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.baseUrl()
      cy.general();
    })

    it('Lihat footer website', () => { 
      cy.get('footer > .container > .sponsored > [href="http://www.pan-uk.org/"] > img')
        .should('have.attr', 'src').should('include','pan@2x.png')
      cy.get('footer > .container > .sponsored > [href="https://www.solidaridadnetwork.org/"] > img').should('have.attr', 'src').should('include','solidaridad@2x.png')
      cy.get('footer > .container > .bottom-nav  > li a').eq(0).contains('Cotton Papers')
      cy.get('footer > .container > .bottom-nav  > li a').eq(1).contains('Company Rankings')
      cy.get('footer > .container > .bottom-nav  > li a').eq(2).contains('Recommendations')
      cy.get('footer > .container > .bottom-nav  > li a').eq(3).contains('Contact')
      cy.get('footer > .container > .disclaimer').contains('This Cotton Barometer has been partly financed by the government of the Netherlands, Ministry of Foreign Affairs. The government of the Netherlands does not necessarily share the expressed views and interpretations.')
      cy.get('footer > .container > .sp2 > [href="#"] > img').should('have.attr', 'src').should('include','Logo-Netherlands@2x.jpg')
      cy.get('footer > .container > .disclaimer').contains('Text is available under')
      cy.get('footer > .container > .disclaimer').contains('Creative Commons license')
      cy.get('footer > .container > .disclaimer').contains('Photos and graphics © Solidaridad or used with permission.')
    });

    it('Klik pada logo Pesticide Action Network UK', () => {
      cy.get('footer > .container > .sponsored a').eq(0).invoke("attr", "target", "_blank").click()
      cy.get(' footer > .container > .sponsored a').eq(0).should('have.attr','href','http://www.pan-uk.org/')
    });

    it('Klik pada logo Solidaridad', () => {
      cy.get('footer > .container > .sponsored a').eq(1).invoke("attr", "target", "_blank").click()
      cy.get('footer > .container > .sponsored a').eq(1).should('have.attr','href','https://www.solidaridadnetwork.org/')
    });

    it('Hover dan klik pada menu Cotton Papers', () => {
      cy.get("footer > .container > .bottom-nav > li a").eq(0).realHover();
      cy.get("footer > .container > .bottom-nav > li a").eq(0).should('have.css', 'color').and('be.colored', '#319044');
      cy.get("footer > .container > .bottom-nav > li a").eq(0).click()
      cy.url().should('eq','https://cotton.staging.catalyze.id/cotton-papers')
    });

    it('Hover dan klik pada menu Company Rankings', () => {
        cy.get("footer > .container > .bottom-nav > li a").eq(1).realHover();
        cy.get("footer > .container > .bottom-nav > li a").eq(1).should('have.css', 'color').and('be.colored', '#319044');
        cy.get("footer > .container > .bottom-nav > li a").eq(1).click()
        cy.url().should('eq','https://cotton.staging.catalyze.id/company-rankings')
    });

    it('Hover dan klik pada menu Recommendations', () => {
        cy.get("footer > .container > .bottom-nav > li a").eq(2).realHover();
        cy.get("footer > .container > .bottom-nav > li a").eq(2).should('have.css', 'color').and('be.colored', '#319044');
        cy.get("footer > .container > .bottom-nav > li a").eq(2).click()
        cy.url().should('eq','https://cotton.staging.catalyze.id/recommendations')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });

    it('Hover dan klik pada menu Contact', () => {
        cy.get("footer > .container > .bottom-nav > li a").eq(3).realHover();
        cy.get("footer > .container > .bottom-nav > li a").eq(3).should('have.css', 'color').and('be.colored', '#319044');
        cy.get("footer > .container > .bottom-nav > li a").eq(3).click()
        cy.url().should('eq','https://cotton.staging.catalyze.id/contact')
    });

    it('Hover dan klik pada link Creative Commons license', () => {
        cy.get("footer > .container > .disclaimer a").realHover();
        cy.get("footer > .container > .disclaimer a").should('have.css', 'color').and('be.colored', '#319044');
        cy.get("footer > .container > .disclaimer a").invoke("attr", "target", "_blank").click()
        cy.get("footer > .container > .disclaimer a").should('have.attr','href','https://creativecommons.org/licenses/by-nc/4.0/deed.en')
    });
 
    it('Double click pada navigasi menu', () => {
        cy.get("footer > .container > .bottom-nav > li a").eq(0).dblclick()
        cy.url().should('eq','https://cotton.staging.catalyze.id/cotton-papers')
        cy.wait(500)
        cy.get("footer > .container > .bottom-nav > li a").eq(1).dblclick()
        cy.url().should('eq','https://cotton.staging.catalyze.id/company-rankings')
        cy.wait(500)
        cy.get("footer > .container > .bottom-nav > li a").eq(2).dblclick()
        cy.url().should('eq','https://cotton.staging.catalyze.id/recommendations')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.wait(500)
        cy.get("footer > .container > .bottom-nav > li a").eq(3).dblclick()
        cy.url().should('eq','https://cotton.staging.catalyze.id/contact')
    });

  })
})
