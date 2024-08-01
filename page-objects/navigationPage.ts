import { Page } from '@playwright/test'

export class NavigationPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async logIn(email: string, password: string){
        await this.page.goto('https://app.intempt.com')
        await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email)
        await this.page.getByPlaceholder('*******').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }

    async journeysPage(){
        await this.page.locator('a').filter({ hasText: 'Journeys' }).click()
    }

    async destinationsPage(){
        await this.page.locator('a').filter({ hasText: 'Destinations' }).click()
    }

    async messagesPage(){
        await this.page.locator('a').filter({ hasText: 'Messages' }).click()
    }

    



}