import rgbHex from 'rgb-hex';
describe('Recommendations', () => { 
  describe('Memastikan halaman Recommendations berhasil ditampilkan dan berfungsi dengan baik sesuai desain yang ada', () => { 
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.visit('/recommendations')
    //   Cypress.on('uncaught:exception', (err, runnable) => {
    //     return false
    // })
      cy.general();
    })

    it('Akses halaman Recommendations', () => { 
        cy.get('header').should("be.visible")
        cy.get('.banner').should("be.visible")
        cy.get('.banner > .content > .container > h1').contains('RECOMMENDATIONS')
        cy.get('.banner > .content > .container > h6').should("be.visible")
        cy.get('section.recommendations .collapsable-area .title').should('have.css', 'background-color').and('be.colored', '#319044');
        cy.scrollTo('bottom')
        cy.wait(5000)
        cy.get('footer').should("be.visible")
    });

    it('Klik pada tombol Read More (+)', () => {
        cy.get("#retailers-and-brands > .title ").eq(0).click()
        cy.get('section.recommendations .collapsable-area .title').should('have.css', 'background-color').and('be.colored', '#013042');
        cy.get("#collapse-retailers-and-brands").should('have.attr', 'aria-expanded', 'true')
        cy.get("section.recommendations .collapsable-area").should('have.css', 'background-color').and('be.colored', '#FFFFFF');
        cy.get("section.recommendations .collapsable-area").eq(0).should('have.css', 'box-shadow','rgba(0, 0, 0, 0.12) 0px 9px 15px 0px');
        cy.scrollTo('top')
        cy.get('section.recommendations .collapsable-area .title>:last-child').eq(0).should('have.css', 'background-image'
        ,'url("https://cotton-qa.staging.catalyze.id/addons/default/themes/barometer2023/img/ic_minus.svg")');
    });

    it('Hover dan klik pada tombol See The Recommendation in Full', () => {
      cy.get("#retailers-and-brands > .title ").eq(0).click()
      cy.wait(5000)
      cy.get('#collapse-retailers-and-brands > .body > .bottom > .button').eq(0).realHover();
      cy.get("#collapse-retailers-and-brands > .body > .bottom > .button").eq(0).should('have.css', 'background-color').and('be.colored', '#277135');
      cy.get("#collapse-retailers-and-brands > .body > .bottom > .button").eq(0).invoke('attr', 'target').should('eq', '_blank')
    });

    it('Hover dan klik pada icon Share', () => {
        cy.get("#retailers-and-brands > .title ").eq(0).click()
        cy.wait(5000)
        cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0).realHover();
        cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0)
        .should('have.css', 'color').and('be.colored', '#319044');
        cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0).click();
        cy.get('[data-share-network="linkedin"]').should('be.visible')
        cy.get('[data-share-network="facebook"]').should('be.visible')
        cy.get('[data-share-network="twitter"]').should('be.visible')
        cy.get('.email').should('be.visible')
    });

    it('Hover dan klik share pada social media tersebut (LinkedIn, Facebook, Instagram, dan/atau Twitter)', () => {
        cy.get("#retailers-and-brands > .title ").eq(0).click()
        cy.wait(5000)
        cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0).click();
        cy.get("#ShareModal .modal-dialog .list a.socialShareBtn").each(($li) => {
            cy.wait(5000)
            cy.get($li).realHover().then(($h) => {
                cy.get($h).should('have.css', 'border-top-color').and('be.colored', '#319044');
           });
            
            //rgb(31, 112, 47)#1F702F#319044
        })
        cy.get("#ShareModal .modal-dialog .list a").each(($li) => {
            cy.wait(5000)
        
            cy.get($li).invoke("attr", "target", "_blank").click()
            if ($li.attr('class') === "email") {
                cy.get($li).should('have.attr','href','mailto:example@mail.com?subject=https://cotton-qa.staging.catalyze.id//recommendations/retailers-and-brands')
            } else {
                cy.get($li).should('have.attr','data-share-url','https://cotton-qa.staging.catalyze.id//recommendations/retailers-and-brands')
            }
            
        })
    });

    it('Hover dan klik share pada icon Email', () => {
        cy.get("#retailers-and-brands > .title ").eq(0).click()
        cy.wait(5000)
        cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0).click();
        cy.get("#ShareModal .modal-dialog .list a").each(($li) => {
            cy.wait(5000)
            cy.get($li).realHover().then(($h) => {
                if ($h.attr('class') === "email") {
                    cy.get($h).should('have.css', 'border-top-color').and('be.colored', '#319044');
                }
           });
           cy.get($li).invoke("attr", "target", "_blank").click()
            if ($li.attr('class') === "email") {
                cy.get($li).should('have.attr','href','mailto:example@mail.com?subject=https://cotton-qa.staging.catalyze.id//recommendations/retailers-and-brands')
            } 
        })
    });

    it('Hover dan klik pada tombol Copy link untuk share', () => {
        cy.get("#retailers-and-brands > .title ").eq(0).click()
        cy.wait(5000)
        cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0).click();
        cy.get('#copyButton').click()
        cy.get('.copy-success').eq(0).should("be.visible")
    });

    it('Klik tombol Close pada pop up Share', () => { 
      cy.get("#retailers-and-brands > .title ").eq(0).click()
      cy.wait(5000)
      cy.get('#collapse-retailers-and-brands > .body > .bottom > .share-socmed > .icon-share').eq(0).click();
      cy.get('[data-dismiss="modal"] > img').click()
      cy.get('.modal-content').should('not.be.visible')
    });

  })
})


