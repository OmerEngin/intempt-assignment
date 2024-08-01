import { Page } from '@playwright/test'

export class MessagesPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async createNewRichTextMessage(messageName:string){
        await this.page.getByRole('button', { name: 'Create message' }).click()

        await this.page.getByRole('menuitem', { name: 'Rich Text' }).click()

        await this.page.getByPlaceholder('Enter message name').fill(messageName)

        await this.page.getByRole('button', { name: 'Create', exact: true}).click()
    
        await this.page.getByPlaceholder('Enter email address').fill('test@test.com')

        await this.page.getByPlaceholder('Enter subject').fill('Test')

        await this.page.getByRole('button', { name: 'Save'}).click()
    }

    async openExistingRichTextMessage(messageName:string){
        const theRichTextMessage = await this.page.getByText(messageName)
        await theRichTextMessage.click()
    }

    async deleteRichTextMessage(messageName){
        const vButton = await this.page.locator('header').getByRole('button', { name: 'image', exact: true })
        const deleteButton = await this.page.locator('p').getByText('Delete')

        await this.page.waitForTimeout(3000)

        await vButton.click()
        await deleteButton.click()

        const journeyNameField = await this.page.getByPlaceholder('Enter Messaging Template name here')
        await journeyNameField.fill(messageName)
        await this.page.getByRole('button', { name: 'Delete Messaging Template' }).click()   
    }

}