describe('General', () => { 
    describe('Memastikan website Cotton berhasil diakses di berbagai browser yang ada serta responsive di semua resolusi desktop (res 1920, 1280)', () => { 

        beforeEach(() => {
            cy.viewport(1920, 1280)
            cy.baseUrl()
        })
        it('Akses website Cotton', () => {
            cy.contains('A Sustainable Cotton Community')
        });
    
        it('Lihat pada semua Font pada Cotton website', () => { 
            cy.general()
        });
    
        it('Hover pada semua link dan button', () => {
            cy.get("nav .nav > li a").realHover();
            cy.get("nav .nav > li a").should('have.css', 'color').and('be.colored', '#319044');
            cy.get("nav .nav > li a").should('have.css', 'text-decoration-color').and('be.colored', '#319044'); 
        });
    
        it('Klik pada tombol atau link external', () => {
            cy.get('.sponsored a').invoke('attr', 'target').should('eq', '_blank')
            cy.get('.sponsored a').then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200);
            });
            cy.visit('/company-rankings')
            cy.get('.previous-links a').invoke('attr', 'target').should('eq', '_blank')
            cy.get('.previous-links a').then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200);
            });
        });
    
        it('Akses website Cotton menggunakan "http://"', () => {
            cy.visit('http://cotton.staging.catalyze.id')
            cy.url().should('eq','https://cotton.staging.catalyze.id/')
        });
    
        it('Masukkan alamat url yang salah', () => {
            cy.visit("/company-rankin" , {esponseTimeout: 120000,failOnStatusCode: false})
            cy.contains('Page Not Found');
        });
    
        it('Hover dan klik "Back to Home" pada halaman 404', () => {
            cy.visit("/company-rankin" , {esponseTimeout: 120000,failOnStatusCode: false})
            cy.get(".container a .button").realHover();     
            cy.get(".container a .button").should('have.css', 'background-color').and('be.colored', '#277135'); 
            cy.get(".container a").contains('back to home').click()
            cy.url().should('eq','https://cotton.staging.catalyze.id/')
        });
    
        it('Klik di halaman pada konten ataupun sembarang tempat yang unclickable', () => {
            
        });
    })
})
