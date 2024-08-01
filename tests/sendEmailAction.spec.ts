import {expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { JourneysPage } from '../page-objects/journeysPage'

test.beforeEach(async ({page}) => {
    const homePage = new NavigationPage(page)
    await homePage.logIn('bolam74153@apn7.com', 'IntemptRocks$1')
})


test('Create a journey', async ({page}) =>{
    const navigateTo = new NavigationPage(page)
    const journeyName = 'omer-test'
    await navigateTo.journeysPage()
    await page.getByRole('button', { name: 'image Create journey' }).click()
    await page.getByRole('button', { name: 'Create a journey' }).click()
    await page.getByPlaceholder('Enter journey name here').fill(journeyName)
    await page.getByRole('button', { name: 'Create journey', exact: true }).click()

    await page.goto('https://app.intempt.com/journeys')
        
    const firstRow = await page.locator('.text-start tableCellClass').getByText(journeyName)
    await expect(firstRow).toBeEnabled
    

})

test('Open an journey named as omer-test', async ({page}) =>{
    const navigateTo = new NavigationPage(page)
    const goToJourneys = new JourneysPage(page)
    const journeyName = 'omer-test'
    await navigateTo.journeysPage()
        
    await goToJourneys.openAnExistingJourney(journeyName)

    const startJourneyButton = await page.getByRole('button', { name: 'Start journey' })
    
    await expect(startJourneyButton).toBeEnabled()

})

test('Take the "Send Email" block from right sidebar to Canvas', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const goToJourneys = new JourneysPage(page)
    const journeyName = 'omer-test'
    await navigateTo.journeysPage()
        
    await goToJourneys.openAnExistingJourney(journeyName)

    const sendEmailDraggable = await page.locator('[draggable="true"]').getByText('Send email').first()
    const canvasField = await page.locator('.journeyConstructor')
    await sendEmailDraggable.dragTo(canvasField)

    await expect(await page.getByText('SEND EMAIL Need setup').first()).toBeVisible()
})

test('Delete a journey', async ({page}) =>{
    const navigateTo = new NavigationPage(page)
    const goToJourneys = new JourneysPage(page)
    const journeyName = 'omer-test'
    await navigateTo.journeysPage()

    await goToJourneys.openAnExistingJourney(journeyName)

    await page.waitForTimeout(3000)
    
    await goToJourneys.deleteTheJourney(journeyName)

    await page.goto('https://app.intempt.com/journeys')

    await expect(await page.locator('table tbody tr').getByText(journeyName)).not.toBeVisible()
        
})