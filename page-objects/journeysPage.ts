import { Page } from '@playwright/test'

export class JourneysPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async openAnExistingJourney(journeyName){
            const theJourney = await this.page.getByText(journeyName)
            await theJourney.click()
            
    }

    async deleteTheJourney(journeyName){
        const vButton = await this.page.locator('[aria-haspopup="true"]')
        const deleteButton = await this.page.locator('p').getByText('Delete')

        await vButton.click()
        await deleteButton.click()

        const journeyNameField = await this.page.getByPlaceholder('Enter journey name here')
        await journeyNameField.fill(journeyName)
        await this.page.getByRole('button', { name: 'Delete journey' }).click()   
    }

}