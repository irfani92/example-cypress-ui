describe('Contact', () => { 
  describe('Memastikan halaman Contact berhasil ditampilkan dan berfungsi dengan baik sesuai desain yang ada', () => { 
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.loginAdmin()
      cy.visit('/contact')
      cy.general();
    })

    it('Akses halaman Contact', () => { 
        cy.get('header').should("be.visible")
        cy.get('.banner').should("be.visible")
        cy.get('.banner .content .container > h1').contains('Contact')
        cy.get('.content-area .list > img').eq(0).should('have.attr', 'src').should('include','pesticide.jpg')
        cy.get('.content-area .list .content > p').eq(0).contains('Integrated pest management and agroecology, pesticide regulation and policy, farmer capacity building, health of farmers and workers, and biodiversity.')
        cy.get('.content-area .list .content .cp > a > img').eq(0).should('have.attr', 'src').should('include','ic_email.svg')
        cy.get('.content-area .list .content .cp > a > span').eq(0).contains('rajan@pan-uk.org')
        cy.get('.content-area .list .content .social-media .name').eq(0).contains('Join the discussion at:')
        cy.get('.content-area .list .content .social-media .link-area > a > img').eq(0).should('have.attr', 'src').should('include','ic_linkedin.svg')
        cy.get("section.contact .card").eq(0).should('have.css', 'background-color').and('be.colored', '#fff');
        cy.get('.content-area .list > img').eq(1).should('have.attr', 'src').should('include','solidaridad.jpg')
        cy.get('.content-area .list .content > p').eq(3).contains('For questions about the cotton paper, as well as centring smallholder farmers, living income for farmers, decent work and living wage for workers, farmer training in good agricultural practice, fair value distribution, and farmer participation, contact Solidaridad at:')
        cy.get('.content-area .list .content .cp > a > img').eq(0).should('have.attr', 'src').should('include','ic_email.svg')
        cy.get('.content-area .list .content .cp > a > span').eq(1).contains('tamar.hoek@solidaridadnetwork.org')
        cy.get('.content-area .list .content .social-media .name').eq(1).contains('Join the discussion at:')
        cy.get('.content-area .list .content .social-media .link-area > a > img').eq(3).should('have.attr', 'src').should('include','ic_linkedin.svg')
        cy.get("section.contact .card").eq(0).should('have.css', 'background-color').and('be.colored', '#fff');

        cy.scrollTo('bottom')
        cy.wait(5000)
        cy.get('footer').should("be.visible")
    });

    it('Hover dan klik pada email', () => {
      cy.scrollTo('bottom')
      cy.wait(5000)
      cy.get('.content-area .list .content .cp > a > span').eq(0).realHover();
      cy.get('.content-area .list .content .cp > a > span').eq(0).should('have.css', 'color').and('be.colored', '#319044');
      Cypress.config("pageLoadTimeout", 60000)
      cy.get('.content-area .list .content .cp > a').eq(0).invoke('attr', 'href')
      .then(href => {
        Cypress.on('fail', (error, runnable) => { return false})
        const after_ = href.slice(href.indexOf('/') + 1);
        cy.forceVisit(after_,{failOnStatusCode: false});
        cy.wait(7000)
      });
   
    });

    // it('Hover dan klik pada salah satu join social media (LinkedIn, Facebook, dan/atau Twitter)', () => {
      
    // });

  })
})
