import { Page } from '@playwright/test'

export class JourneysPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async createNewJourney(journeyName){
        await this.page.getByRole('button', { name: 'image Create journey' }).click()
        await this.page.getByRole('button', { name: 'Create a journey' }).click()
        await this.page.getByPlaceholder('Enter journey name here').fill(journeyName)
        await this.page.getByRole('button', { name: 'Create journey', exact: true }).click()
            
    }

    async openAnExistingJourney(journeyName){
        const theJourney = await this.page.getByText(journeyName)
        await theJourney.click()
            
    }

    async dragTheActionToCanvas(actionName:string){
        const draggableAction = await this.page.locator('[draggable="true"]').getByText(actionName).first()
    
        const box = await draggableAction.boundingBox();
        if (box) {
            const x = box.x + box.width / 4;
            const y = box.y + box.height / 4;
  
            // Perform the drag action
            await this.page.mouse.move(x, y);
            await this.page.mouse.down();
            await this.page.mouse.move(0, y); // Move to the left edge of the page
            await this.page.mouse.up();
      }
    }


    async deleteTheJourney(journeyName){
        const vButton = await this.page.locator('[aria-haspopup="true"]')
        const deleteButton = await this.page.locator('p').getByText('Delete')

        await this.page.waitForTimeout(3000)

        await vButton.click()
        await deleteButton.click()

        const journeyNameField = await this.page.getByPlaceholder('Enter journey name here')
        await journeyNameField.fill(journeyName)
        await this.page.getByRole('button', { name: 'Delete journey' }).click()   
    }

    async custumizeSendEmailBlock(emailBlockName:string, emailDestinationName:string, messageName:string ){
        await this.page.getByText('SEND EMAIL Need setup').first().dblclick()

        await this.page.getByPlaceholder('Enter a name').fill(emailBlockName)

        await this.page.getByPlaceholder('Search').fill(emailDestinationName)

        await this.page.getByPlaceholder('Search').press('Enter')

        await this.page.locator('div div').getByText(emailDestinationName).click()

        await this.page.getByPlaceholder('Select email').click()

        await this.page.getByRole('option', { name: messageName }).click()

        await this.page.locator('[value="new-thread"]').click()

        await this.page.getByRole('button', { name: 'Save' }).click()
    }

}