describe('Cotton Papers', () => { 
  describe('Memastikan halaman Cotton Papers berhasil ditampilkan dan berfungsi dengan baik sesuai desain yang ada', () => { 
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.loginAdmin()
      cy.visit('/cotton-papers')
      cy.general();
    })
   
    it('Akses halaman Cotton Papers', () => { 
        cy.get('header').should("be.visible")
        cy.get('.banner').should("be.visible")
        cy.get('.banner > .content > .container > h1').contains('Cotton Paper')
        cy.get('.banner > .content > .container > h6').should("be.visible")
        cy.get('.cotton-barometer section.lead').should('have.css', 'background-color').and('be.colored', '#F2F1EC');
        cy.get('#list-paper .img-area img').should("be.visible")
        cy.get('#list-paper > .content-area > .content > h3').contains('Cotton and Corporate Responsibility');
        cy.get('.list-papers .paper .content-area').then($els => {
            const win = $els[0].ownerDocument.defaultView
            const before = win.getComputedStyle($els[0], 'before')
            const contentValue = before.getPropertyValue('background-color')
            expect(contentValue).to.eq(hexToRgbA('#F2F1EC'))
        })
        cy.get('#list-paper > .content-area > .content > .bottom > .button > :nth-child(1) > img').should("be.visible")
        cy.get('#list-paper > .content-area > .content > .bottom > .button > :nth-child(1)').contains('Download the paper')
        cy.get('#list-paper > .content-area > .content > .bottom > .button > :nth-child(1)').eq(0).click()
        cy.get('#press-release > .content-area > .content > .bottom > .button').should("be.visible")
        cy.get('#press-release > .content-area > .content > .bottom > .button').contains('Download Press Release')
        cy.get('#press-release > .content-area > .content > .bottom > .button').click()
        cy.scrollTo('bottom')
        cy.wait(5000)
        //cy.get('footer').should("be.visible")
    });

    it('Hover dan klik pada tombol Download The Paper', () => {
      cy.wait(5000)
        cy.get('#press-release > .content-area > .content > .bottom > .button').eq(0).realHover()
        cy.get('#press-release > .content-area > .content > .bottom > .button').eq(0).should('have.css', 'background-color').and('be.colored', '#277135');
        cy.get('#press-release > .content-area > .content > .bottom > .button').eq(0).click()
        cy.get('#press-release > .content-area > .content > .bottom > .button').eq(0).should('have.attr','target','_blank')
    });

    // it('Download the dokumen', () => {
     
    // });

    it('Hover dan klik pada tombol Download Press Release', () => {
        cy.wait(5000)
        cy.get('#list-paper > .content-area > .content > .bottom > .button').eq(1).realHover()
        cy.get('#list-paper > .content-area > .content > .bottom > .button').eq(1).should('have.css', 'background-color').and('be.colored', '#277135');
        cy.get('#list-paper > .content-area > .content > .bottom > .button').eq(1).click()
        cy.get('#list-paper > .content-area > .content > .bottom > .button').eq(1).should('have.attr','target','_blank')

    });

    it('Hover dan klik pada icon Share', () => {
      cy.wait(5000)
        cy.get('.icon-share').realHover()
        cy.get('.icon-share').then($els => {
          const win = $els[0].ownerDocument.defaultView
          const before = win.getComputedStyle($els[0], 'before')
          const contentValue = before.getPropertyValue('background-image')
          expect(contentValue).to.eq('url("https://cotton-qa.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/ic_share_green.svg")')
        })
        cy.get('.icon-share').click()
        cy.get('.modal-header').contains('Share this via')
        cy.get('[data-share-network="linkedin"]').should('be.visible')
        cy.get('[data-share-network="facebook"]').should('be.visible')
        cy.get('[data-share-network="twitter"]').should('be.visible')
        cy.get('.email').should('be.visible')
  
      });
      
      it('Hover dan klik share pada social media tersebut (LinkedIn, Facebook, Instagram, dan/atau Twitter)', () => {
        cy.get('.icon-share').click() 
        cy.get('[data-share-network="linkedin"]').realHover()
        cy.get('[data-share-network="linkedin"]').should('have.css', 'border-top-color').and('be.colored', '#319044');
        cy.get('[data-share-network="facebook"]').realHover()
        cy.get('[data-share-network="facebook"]').should('have.css', 'border-top-color').and('be.colored', '#319044');
        cy.get('[data-share-network="twitter"]').realHover()
        cy.get('[data-share-network="twitter"]').should('have.css', 'border-top-color').and('be.colored', '#319044');
  //rgb(31, 112, 47)#1F702F#319044
      
      cy.get("#ShareModal .modal-dialog .list a").each(($li) => {
          cy.wait(5000)
          cy.get($li).invoke("attr", "target", "_blank").click()
          if ($li.attr('class') === "email") {
              cy.get($li).should('have.attr','href'
              ,'mailto:example@mail.com?subject=https://cotton-qa.staging.catalyze.id/cotton-papers')
          } else {
              cy.get($li).should('have.attr','data-share-url','https://cotton-qa.staging.catalyze.id/cotton-papers')
          }
          
      })
        
      });
  
      it('Hover dan klik share pada icon Email', () => {
        cy.get('.icon-share').click() 
        cy.get('.email').eq(0).realHover()
        cy.get('.email').eq(0).should('have.css', 'border-top-color').and('be.colored', '#319044');
        cy.get('.email').eq(0).invoke("attr", "target", "_blank").click()
        cy.get('.email').eq(0).should('have.attr','href'
        ,'mailto:example@mail.com?subject=https://cotton-qa.staging.catalyze.id/cotton-papers')
      });
  
      it('Hover dan klik pada tombol Copy link untuk share', () => {
        cy.get('.icon-share').click() 
        cy.get('#copyButton').click()
        cy.get('.copy-success').eq(0).should("be.visible")
      });
  
      it('Klik tombol Close pada pop up Share', () => { 
        cy.get('.icon-share').click()
        cy.wait(5000)
        cy.get('[data-dismiss="modal"] > img').click()
        cy.get('.modal-content').should('not.be.visible')
        cy.wait(7000)
      });
  })
})

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(', ')+')';
    }
    throw new Error('Bad Hex');
}

