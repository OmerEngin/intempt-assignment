import {expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { JourneysPage } from '../page-objects/journeysPage'
import { MessagesPage } from '../page-objects/messagesPage'


test.describe('Send Email Action Test Suit', () => {

    test.beforeEach(async ({page}) => {
        const homePage = new NavigationPage(page)
        await homePage.logIn('bolam74153@apn7.com', 'RockTheInterview$1')
    })
    
    
    test('Create a journey', async ({page}) =>{
        const navigateTo = new NavigationPage(page)
        const journeyName = 'omer-test'
        const goToJourneys = new JourneysPage(page)
    
        await navigateTo.journeysPage()
    
        await goToJourneys.createNewJourney(journeyName)
    
        await page.goto('https://app.intempt.com/journeys')
            
        const journey = await page.locator('.text-start tableCellClass').getByText(journeyName)
        await expect(journey).toBeEnabled
        
    
    })
    
    test('Open an journey named as omer-test', async ({page}) =>{
        const navigateTo = new NavigationPage(page)
        const goToJourneys = new JourneysPage(page)
        const journeyName = 'omer-test'
        await navigateTo.journeysPage()
            
        await goToJourneys.openAnExistingJourney(journeyName)
    
        const startJourneyButton = await page.getByRole('button', { name: 'Start journey' })
    
        await page.waitForTimeout(5000)
        
        await expect(startJourneyButton).toBeEnabled()
    
    })
    
    test('Take the "Send Email" block from right sidebar to Canvas', async ({page}) => {
        const navigateTo = new NavigationPage(page)
        const goToJourneys = new JourneysPage(page)
        const journeyName = 'omer-test'
        await navigateTo.journeysPage()
            
        await goToJourneys.openAnExistingJourney(journeyName)
    
        await goToJourneys.dragTheActionToCanvas('Send email')
    
        await expect(await page.getByText('SEND EMAIL Need setup').first()).toBeVisible()
    })
    
    test('Create a Rich Text Message', async ({page}) => {
        const navigateTo = new NavigationPage(page)
        const goToMessages = new MessagesPage(page)
        
        const messageName = 'TestSMS'
    
        await navigateTo.messagesPage()
    
        await goToMessages.createNewRichTextMessage(messageName)
    
        await expect(await page.getByText('Message template updated successfully')).toBeVisible()
    
    })
    
    test('Customize the "Send Email" block', async ({page}) => {
        const navigateTo = new NavigationPage(page)
        const goToJourneys = new JourneysPage(page)
        const journeyName = 'omer-test'
        const messageName = 'TestSMS'
        const emailBlockName = 'Test send email'
        const emailDestinationName = 'Test3'
        await navigateTo.journeysPage()
    
        await goToJourneys.openAnExistingJourney(journeyName)
    
        await goToJourneys.custumizeSendEmailBlock(emailBlockName, emailDestinationName, messageName)
    
        await expect(await page.getByText('SEND EMAIL Need setup').first()).not.toBeVisible()
    
    })
    
    test('Delete the journey', async ({page}) =>{
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
    
    test('Delete the rich text message', async ({page}) =>{
        const navigateTo = new NavigationPage(page)
        const goToMessages = new MessagesPage(page)
        const messageName = 'TestSMS'
    
        await navigateTo.messagesPage()
    
        await goToMessages.openExistingRichTextMessage(messageName)
    
        await page.waitForTimeout(3000)
        
        await goToMessages.deleteRichTextMessage(messageName)
    
        await page.goto('https://app.intempt.com/messages')
    
        await expect(await page.locator('table tbody tr').getByText(messageName)).not.toBeVisible()
            
    })

    test.afterAll( async ({page}) => {
        await page.close()
    })

})

