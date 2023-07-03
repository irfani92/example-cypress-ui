import rgbHex from 'rgb-hex';
describe('Homepage', () => { 
  describe('Memastikan homepage berhasil ditampilkan dan berfungsi dengan baik sesuai desain yang ada', () => { 
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.loginAdmin()
      cy.baseUrl()
      cy.general();
    })

    it('Akses homepage Cotton Website', () => { 
        cy.get('header').should("be.visible")
        cy.get('.banner').should("be.visible")
        cy.get('.banner > .content > .container > h1').contains('An unsustainable cotton sector is a choice')
        //cy.get('.banner > img').should('have.attr', 'src').should('include','scroll-down.svg')
        cy.get('section.content-list').eq(1).should('have.css', 'background-color').and('be.colored', '#fff');
        cy.get('.diagram-area > img').should('have.attr', 'src').should('include','companies-performance.jpg')
        cy.get('.content-area').contains('Ranking Retailers and Brands')
        cy.get('.content-area a').contains('SEE COMPANIES PERFORMANCE')
        cy.scrollTo('bottom')
        cy.wait(5000)
        cy.get('footer').should("be.visible")
    });

    it('Scroll pada Gif to scroll', () => {
     
    });

    it('Hover dan klik tombol Read The Report pada bagian A Sustainable Cotton Community', () => {
      cy.scrollTo(0, 500)
      cy.wait(5000)
      cy.get('.content-area > .button').eq(0).realHover();
      cy.get(".content-area > .button").eq(0).should('have.css', 'background-color').and('be.colored', '#277135');
      cy.get(".content-area > .button").eq(0).click()
     // cy.url().should('eq','https://cotton-qa.staging.catalyze.id//cotton-papers')
    });

    it('Hover dan klik tombol View The Ranking pada bagian Ranking Retailers and Brands', () => {
      cy.scrollTo(0, 500)
      cy.wait(5000)
      cy.get('.content-area > .button').eq(1).realHover();
      cy.get(".content-area > .button").eq(1).should('have.css', 'background-color').and('be.colored', '#277135');
      cy.get(".content-area > .button").eq(1).click()
      cy.url().should('eq','https://cotton-qa.staging.catalyze.id//cotton-rankings')
    });

    it('Hover dan klik tombol Recommendations for Stakeholders pada bagian Who is the Cotton Barometer for?', () => {
        cy.scrollTo(0, 500)
        cy.wait(5000)
        cy.get(".who-is .container a.button").eq(0).realHover();
        cy.get(".who-is .container a.button").eq(0).should('have.css', 'background-color').and('be.colored', '#277135');
        cy.get(".who-is .container a.button").eq(0).click()
        cy.url().should('eq','https://cotton-qa.staging.catalyze.id/recommendations')
        Cypress.on('uncaught:exception', (err, runnable) => {
              return false
        })
    });

    it('Hover dan klik pada tombol Download The Report', () => {
       
    });

    it('Klik kanan pada tombol yang ada di homepage', () => {
      cy.get('section').eq(1).rightclick()
      cy.url().should('eq','https://cotton-qa.staging.catalyze.id/')
      cy.wait(7000)
    });
  })
})
