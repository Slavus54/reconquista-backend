require('dotenv').config()
const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT
const url = process.env.MONGO_URL

// schemas

const Profiles = require('./schemas/Profiles')  
const Individuals = require('./schemas/Individuals')  
const Raids = require('./schemas/Raids') 
const Stories = require('./schemas/Stories') 
const Laws = require('./schemas/Laws') 
const Lands = require('./schemas/Lands') 

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id, limit} = require('./microservices/microservices')

// middlewares

middleware(app)

// connect to MongoDB

mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Treasure {
        shortid: String!,
        title: String!,
        category: String!,
        century: String!,
        image: String!,
        likes: Float!
    }
    type Quote {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        rating: Float!
    }
    type Image {
        shortid: String!,
        name: String!,
        title: String!,
        format: String!,
        source: String!,
        likes: Float!
    }
    type Member {
        account_id: String!,
        username: String!,
        role: String!
    }
    type Incident {
        shortid: String!,
        name: String!,
        text: String!,
        format: String!,
        race: String!,
        image: String!,
        cords: Cord!
    }
    type Topic {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        url: String!,
        likes: Float!
    }
    type Chapter {
        content: String!,
        format: String!,
        image: String!
    }
    input IChapter {
        content: String!,
        format: String!,
        image: String!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        reply: String!,
        answered: Boolean!,
        likes: Float!
    }
    type Sharing {
        shortid: String!,
        name: String!,
        position: String!,
        rating: Float!,
        dateUp: String!
    }
    type Version {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        likes: Float!
    }
    type Issue {
        shortid: String!,
        name: String!,
        title: String!,
        level: String!,
        image: String!,
        timestamp: String!
    }
    type Fact {
        shortid: String!,
        name: String!,
        text: String!,
        level: String!,
        format: String!,
        isTrue: Boolean!
    }
    type Location {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        cords: Cord!,
        image: String!,
        likes: Float!
    }
    type Land {
        id: ID!,
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        century: String!,
        region: String!,
        cords: Cord!,
        timestamp: String!,
        period: String!,
        facts: [Fact]!,
        locations: [Location]!
    }
    type Law {
        id: ID!,
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        location: String!,
        region: String!,
        size: String!,
        status: String!,
        rating: Float!,
        versions: [Version]!,
        issues: [Issue]!
    }
    type Story {
        id: ID!,
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        religion: String!,
        status: String!,
        chapters: [Chapter]!,
        region: String!,
        cords: Cord!,
        goal: String!,
        card: String!,
        questions: [Question]!,
        sharings: [Sharing]!
    }
    type Raid {
        id: ID!,
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        region: String!,
        cords: Cord!,
        dots: [Cord]!,
        dateUp: String!,
        time: String!,
        members: [Member]!,
        incidents: [Incident]!,
        topics: [Topic]!
    }
    type Individual {
        id: ID!,
        shortid: String!,
        fullname: String!,
        category: String!,
        sex: String!,
        century: String!, 
        region: String!,
        cords: Cord!,
        achievement: String!,
        quotes: [Quote]!,
        images: [Image]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        password: String!,
        telegram: String!,
        goal: String!,
        budget: Float!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        treasures: [Treasure]!,
        account_components: [AccountComponent]!
    }
    type Query {
        getProfiles: [Profile]!
        getIndividuals: [Individual]!
        getRaids: [Raid]!
        getStories: [Story]!
        getLaws: [Law]!
        getLands: [Land]!
    }
    type Mutation {
        createProfile(username: String!, password: String!, telegram: String!, goal: String!, budget: Float!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        loginProfile(password: String!) : UserCookie!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileCommonInfo(account_id: String!, goal: String!, budget: Float!) : String!
        updateProfilePassword(account_id: String!, password: String!) : String!
        manageProfileTreasure(account_id: String!, option: String!, title: String!, category: String!, century: String!, image: String!, coll_id: String!) : String!
        createIndividual(username: String!, id: String!, fullname: String!, category: String!, sex: String!, century: String!, region: String!, cords: ICord!, achievement: String!) : String!
        getIndividual(shortid: String!) : Individual!
        manageIndividualQuote(username: String!, id: String!, option: String!, text: String!, category: String!, rating: Float!, coll_id: String!) : String!
        updateIndividualAchievement(username: String!, id: String!, achievement: String!) : String!
        manageIndividualImage(username: String!, id: String!, option: String!, title: String!, format: String!, source: String!, coll_id: String!) : String!
        createRaid(username: String!, id: String!, title: String!, category: String!, region: String!, cords: ICord!, dots: [ICord]!, dateUp: String!, time: String!, role: String!) : String!
        getRaid(shortid: String!) : Raid!
        manageRaidStatus(username: String!, id: String!, option: String!, role: String!) : String!
        makeRaidIncident(username: String!, id: String!, text: String!, format: String!, race: String!, image: String!, cords: ICord!) : String!
        manageRaidTopic(username: String!, id: String!, option: String!, title: String!, category: String!, url: String!, coll_id: String!) : String!
        createStory(username: String!, id: String!, title: String!, category: String!, religion: String!, status: String!, chapters: [IChapter]!, region: String!, cords: ICord!, goal: String!, card: String!) : String!
        getStory(shortid: String!) : Story!
        makeStoryChapter(username: String!, id: String!, content: String!, format: String!, image: String!) : String!
        manageStoryQuestion(username: String!, id: String!, option: String!, text: String!, category: String!, coll_id: String!, reply: String!) : String!
        updateStoryInfo(username: String!, id: String!, goal: String!, card: String!) : String!
        makeStorySharing(username: String!, id: String!, position: String!, rating: Float!, dateUp: String!) : String!
        createLaw(username: String!, id: String!, title: String!, category: String!, location: String!, region: String!, size: String!, status: String!, rating: Float!) : String!
        getLaw(shortid: String!) : Law!
        manageLawVersion(username: String!, id: String!, option: String!, text: String!, category: String!, coll_id: String!) : String!
        updateLawInfo(username: String!, id: String!, status: String!, rating: Float!) : String!
        makeLawIssue(username: String!, id: String!, title: String!, level: String!, image: String!, timestamp: String!) : String!
        createLand(username: String!, id: String!, title: String!, category: String!, century: String!, region: String!, cords: ICord!, timestamp: String!, period: String!) : String!
        getLand(shortid: String!) : Land!
        makeLandFact(username: String!, id: String!, text: String!, level: String!, format: String!, isTrue: Boolean!) : String!
        updateLandInfo(username: String!, id: String!, timestamp: String!, period: String!) : String!
        manageLandLocation(username: String!, id: String!, option: String!, title: String!, category: String!, cords: ICord!, image: String!, coll_id: String!) : String!
    }
`

const resolvers = {
    Query: {
        getProfiles: async () => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getIndividuals: async () => {
            const individuals = await Individuals.find()

            return individuals
        },
        getRaids: async () => {
            const raids = await Raids.find()
       
            return raids
        },
        getStories: async () => {
            const stories = await Stories.find()

            return stories
        },
        getLaws: async () => {
            const laws = await Laws.find()

            return laws
        },
        getLands: async () => {
            const lands = await Lands.find()

            return lands
        }
    },
    Mutation: {
        createProfile: async (_, {username, password, telegram, goal, budget, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    password,
                    telegram,
                    goal,
                    budget,
                    region,
                    cords,
                    main_photo,
                    treasures: [],
                    account_components: []
                })

                drop_object = {account_id, username}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        loginProfile: async (_, {password}) => {
            const profile = await Profiles.findOne({password}) 
            let drop_object = {account_id: '', username: ''}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username}                       
            }

            return drop_object
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return PERSONAL_INFO_SUCCESS
            }

            return PERSONAL_INFO_FALL
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return GEO_INFO_SUCCESS
            }

            return GEO_INFO_FALL
        },
        updateProfileCommonInfo: async (_, {account_id, goal, budget}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.goal = goal
                profile.budget = budget
              
                await Profiles.updateOne({account_id}, {$set: profile})

                return COMMON_INFO_SUCCESS
            }

            return COMMON_INFO_FALL
        },
        updateProfilePassword: async (_, {account_id, password}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.password = password

                await Profiles.updateOne({account_id}, {$set: profile})

                return PASSWORD_SUCCESS
            }

            return PASSWORD_FALL
        },
        manageProfileTreasure: async (_, {account_id, option, title, category, century, image, coll_id}) => {
            const profile = await Profiles.findOne({account_id})
            
            if (profile) {
                
                let status = ''

                if (option === 'create') {

                    let shortid = get_id()

                    profile.treasures = [...profile.treasures, {
                        shortid,
                        title,
                        category,
                        century,
                        image,
                        likes: 0
                    }]

                    profile.treasures = slicer(profile.treasures)

                    status = TREASURE_CREATED

                } else if (option === 'like') {

                    profile.treasures.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    status = TREASURE_LIKED
                    
                }  else {

                    profile.treasures = profile.treasures.filter(el => el.shortid !== coll_id)

                    status = TREASURE_DELETED
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return status
            }

            return TREASURE_FALL
        },
        createIndividual: async (_, {username, id, fullname, category, sex, century, region, cords, achievement}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const individual = await Individuals.findOne({fullname, category, sex, century, region, cords, achievement})

            if (profile && !individual) {
                if (profile.account_components.filter(el => el.path === 'individual').find(el => el.title === fullname) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title: fullname,
                        path: 'individual'
                    }]

                    const newIndividual = new Individuals({
                        shortid,
                        fullname,
                        category,
                        sex,
                        century, 
                        region,
                        cords,
                        achievement,
                        quotes: [],
                        images: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newIndividual.save()

                    return INDIVIDUAL_CREATED
                }
            }

            return INDIVIDUAL_FALL
        },
        getIndividual: async (_, {shortid}) => {
            const individual = await Individuals.findOne({shortid})

            return individual
        },
        manageIndividualQuote: async (_, {username, id, option, text, category, rating, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const individual = await Individuals.findOne({shortid: id})
        
            if (profile && individual) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    individual.quotes = [...individual.quotes, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        rating
                    }]

                    individual.quotes = slicer(individual.quotes, limit)

                    feedback = INDIVIDUAL_QUOTE_CREATED

                } else if (option === 'update') {

                    individual.quotes.map(el => {
                        if (el.shortid === coll_id) {
                            el.rating = rating
                        }
                    })

                    feedback = INDIVIDUAL_QUOTE_UPDATED

                } else {

                    individual.quotes = individual.quotes.filter(el => el.shortid !== coll_id)

                    feedback = INDIVIDUAL_QUOTE_DELETED
                }

                await Individuals.updateOne({shortid: id}, {$set: individual})

                return feedback
            }

            return INDIVIDUAL_QUOTE_FALL
        },
        updateIndividualAchievement: async (_, {username, id, achievement}) => {
            const profile = await Profiles.findOne({username})
            const individual = await Individuals.findOne({shortid: id})
        
            if (profile && individual) {

                individual.achievement = achievement

                await Individuals.updateOne({shortid: id}, {$set: individual})

                return INDIVIDUAL_ACHIEVEMENT_UPDATED
            }

            return INDIVIDUAL_ACHIEVEMENT_FALL
        },
        manageIndividualImage: async (_, {username, id, option, title, format, source, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const individual = await Individuals.findOne({shortid: id})
        
            if (profile && individual) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    individual.images = [...individual.images, {
                        shortid,
                        name: profile.username,
                        title,
                        format,
                        source,
                        likes: 0
                    }]

                    individual.images = slicer(individual.images, limit)

                    feedback = INDIVIDUAL_IMAGE_CREATED

                } else if (option === 'like') {

                    individual.images.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = INDIVIDUAL_IMAGE_LIKED

                } else {

                    individual.images = individual.images.filter(el => el.shortid !== coll_id)

                    feedback = INDIVIDUAL_IMAGE_DELETED
                }

                await Individuals.updateOne({shortid: id}, {$set: individual})

                return feedback
            }

            return INDIVIDUAL_IMAGE_FALL
        },
        createRaid: async (_, {username, id, title, category, region, cords, dots, dateUp, time, role}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const raid = await Raids.findOne({username, title, category, region, dateUp, time})
        
            if (profile && !raid) {
                if (profile.account_components.filter(el => el.path === 'raid').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'raid'
                    }]

                    const newRaid = new Raids({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        region,
                        cords,
                        dots,
                        dateUp,
                        time,
                        members: [{
                            account_id: profile.account_id,
                            username: profile.username,
                            role
                        }],
                        incidents: [],
                        topics: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newRaid.save()

                    return RAID_CREATED
                }
            }

            return RAID_FALL
        },
        getRaid: async (_, {shortid}) => {
            const raid = await Raids.findOne({shortid})

            return raid
        },
        manageRaidStatus: async (_, {username, id, option, role}) => {
            const profile = await Profiles.findOne({username})
            const raid = await Raids.findOne({shortid: id})

            if (profile && raid) {
                
                let feedback = ''

                if (option === 'create') {

                    profile.account_components = [...profile.account_components, {
                        shortid: raid.shortid,
                        title: raid.title,
                        path: 'raid'
                    }]

                    raid.members = [...raid.members, {
                        account_id: profile.account_id,
                        username: profile.username,
                        role
                    }]

                    feedback = RAID_STATUS_JOINED

                } else if (option === 'update') {

                    raid.members.map(el => {
                        if (el.account_id === profile.account_id) {
                            el.role = role
                        }
                    })

                    feedback = RAID_STATUS_UPDATED

                } else {

                    profile.account_components = profile.account_components.filter(el => el.shortid !== raid.shortid)

                    raid.members = raid.members.filter(el => el.account_id !== profile.account_id)

                    feedback = RAID_STATUS_EXIT
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Raids.updateOne({shortid: id}, {$set: raid})

                return feedback
            }

            return RAID_STATUS_FALL
        },
        makeRaidIncident: async (_, {username, id, text, format, race, image, cords}) => {
            const profile = await Profiles.findOne({username})
            const raid = await Raids.findOne({shortid: id})

            if (profile && raid) {

                let shortid = get_id()

                raid.incidents = [...raid.incidents, {
                    shortid,
                    name: profile.username,
                    text,
                    format,
                    race,
                    image,
                    cords
                }]

                raid.incidents = slicer(raid.incidents, limit)

                await Raids.updateOne({shortid: id}, {$set: raid})
            
                return RAID_INCIDENT_CREATED
            }

            return RAID_INCIDENT_FALL
        },
        manageRaidTopic: async (_, {username, id, option, title, category, url, coll_id})  => {
            const profile = await Profiles.findOne({username})
            const raid = await Raids.findOne({shortid: id})

            if (profile && raid) {
                
                let feedback = ''
                
                if (option === 'create') {

                    let shortid = get_id()

                    raid.topics = [...raid.topics, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        url,
                        likes: 0
                    }]

                    raid.topics = slicer(raid.topics, limit)

                    feedback = RAID_TOPIC_CREATED

                } else if (option === 'like') {

                    raid.topics.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = RAID_TOPIC_LIKED

                } else {

                    raid.topics = raid.topics.filter(el => el.shortid !== coll_id)

                    feedback = RAID_TOPIC_DELETED
                }

                await Raids.updateOne({shortid: id}, {$set: raid})

                return feedback
            }

            return RAID_TOPIC_FALL
        },
        createStory: async (_, {username, id, title, category, religion, status, chapters, region, cords, goal, card}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const story = await Stories.findOne({username, title, category, religion, status, region})

            if (profile && !story) {
                if (profile.account_components.filter(el => el.path === 'story').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'story'
                    }]

                    const newStory = new Stories({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        religion,
                        status,
                        chapters,
                        region,
                        cords,
                        goal,
                        card,
                        questions: [],
                        sharings: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newStory.save()

                    return STORY_CREATED
                }
            }

            return STORY_FALL
        },
        getStory: async (_, {shortid}) => {
            const story = await Stories.findOne({shortid})

            return story
        },
        makeStoryChapter: async (_, {username, id, content, format, image}) => {
            const profile = await Profiles.findOne({username})
            const story = await Stories.findOne({shortid: id})

            if (profile && story) {

                story.chapters = [...story.chapters, {
                    content,
                    format,
                    image
                }]

                await Stories.updateOne({shortid: id}, {$set: story})

                return STORY_CHAPTER_CREATED
            }

            return STORY_CHAPTER_FALL
        },
        manageStoryQuestion: async (_, {username, id, option, text, category, coll_id, reply}) => {
            const profile = await Profiles.findOne({username})
            const story = await Stories.findOne({shortid: id})

            if (profile && story) {
                
                let feedback = ''
                
                if (option === 'create') {

                    let shortid = get_id()

                    story.questions = [...story.questions, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        reply: '',
                        answered: false,
                        likes: 0
                    }]

                    story.questions = slicer(story.questions, limit)

                    feedback = STORY_QUESTION_CREATED

                } else if (option === 'delete') {

                    story.questions = story.questions.filter(el => el.shortid !== coll_id)

                    feedback = STORY_QUESTION_DELETED
                
                } else {

                    story.questions.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'like') {
                                el.likes += 1

                                feedback = STORY_QUESTION_LIKED

                            } else if (option === 'reply') {
                                el.reply = reply
                                el.answered = true
                            
                                feedback = STORY_QUESTION_REPLIED
                            }
                        }
                    })
                }
            
                await Stories.updateOne({shortid: id}, {$set: story})

                return feedback
            }

            return STORY_QUESTION_FALL
        },
        updateStoryInfo: async (_, {username, id, goal, card}) => {
            const profile = await Profiles.findOne({username})
            const story = await Stories.findOne({shortid: id})

            if (profile && story) {

                story.goal = goal
                story.card = card

                await Stories.updateOne({shortid: id}, {$set: story})

                return STORY_INFO_UPDATED
            }

            return STORY_INFO_FALL
        },
        makeStorySharing: async (_, {username, id, position, rating, dateUp}) => {
            const profile = await Profiles.findOne({username})
            const story = await Stories.findOne({shortid: id})

            if (profile && story) {

                let shortid = get_id()

                story.sharings = [...story.sharings, {
                    shortid,
                    name: profile.username,
                    position,
                    rating,
                    dateUp
                }]

                story.sharings = slicer(story.sharings, limit)

                await Stories.updateOne({shortid: id}, {$set: story})

                return STORY_SHARING_CREATED
            }

            return STORY_SHARING_FALL
        },
        createLaw: async (_, {username, id, title, category, location, region, size, status, rating}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const law = await Laws.findOne({username, title, category, location})
        
            if (profile && !law) {
                if (profile.account_components.filter(el => el.path === 'law').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'law'
                    }]

                    const newLaw = new Laws({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        location,
                        region,
                        size,
                        status,
                        rating,
                        versions: [],
                        issues: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newLaw.save()

                    return LAW_CREATED
                }
            }

            return LAW_FALL
        },
        getLaw: async (_, {shortid}) => {
            const law = await Laws.findOne({shortid})
        
            return law
        },
        manageLawVersion: async (_, {username, id, option, text, category, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const law = await Laws.findOne({shortid: id})
        
            if (profile && law) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    law.versions = [...law.versions, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        likes: 0
                    }]

                    law.versions = slicer(law.versions, limit)

                    feedback = LAW_VERSION_CREATED

                } else if (option === 'like') {

                    law.versions.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = LAW_VERSION_LIKED

                } else {

                    law.versions = law.versions.filter(el => el.shortid !== coll_id)

                    feedback = LAW_VERSION_DELETED
                }

                await Laws.updateOne({shortid: id}, {$set: law})

                return feedback
            }

            return LAW_VERSION_FALL
        },
        updateLawInfo: async (_, {username, id, status, rating}) => {
            const profile = await Profiles.findOne({username})
            const law = await Laws.findOne({shortid: id})
        
            if (profile && law) {
                
                law.status = status
                law.rating = rating

                await Laws.updateOne({shortid: id}, {$set: law})

                return LAW_INFO_UPDATED
            }

            return LAW_INFO_FALL
        },
        makeLawIssue: async (_, {username, id, title, level, image, timestamp}) => {
            const profile = await Profiles.findOne({username})
            const law = await Laws.findOne({shortid: id})
        
            if (profile && law) {

                let shortid = get_id()

                law.issues = [...law.issues, {
                    shortid,
                    name: profile.username,
                    title,
                    level,
                    image,
                    timestamp
                }]

                law.issues = slicer(law.issues, limit)

                await Laws.updateOne({shortid: id}, {$set: law})

                return LAW_ISSUE_CREATED
            }

            return LAW_ISSUE_FALL
        },
        createLand: async (_, {username, id, title, category, century, region, cords, timestamp, period}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const land = await Lands.findOne({username, title, category, century, region, cords})

            if (profile && !land) {
                if (profile.account_components.filter(el => el.path === 'land').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'land'
                    }]

                    const newLand = new Lands({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        century,
                        region,
                        cords,
                        timestamp,
                        period,
                        facts: [],
                        locations: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newLand.save()
             
                    return LAND_CREATED
                }
            }

            return LAND_FALL
        },
        getLand: async (_, {shortid}) => {
            const land = await Lands.findOne({shortid})

            return land
        },
        makeLandFact: async (_, {username, id, text, level, format, isTrue}) => {
            const profile = await Profiles.findOne({username})
            const land = await Lands.findOne({shortid: id})
        
            if (profile && land) {

                let shortid = get_id()

                land.facts = [...land.facts, {
                    shortid,
                    name: profile.username,
                    text,
                    level,
                    format,
                    isTrue
                }]

                land.facts = slicer(land.facts, limit)

                await Lands.updateOne({shortid: id}, {$set: land})
            
                return LAND_FACT_CREATED
            }

            return LAND_FACT_FALL
        },
        updateLandInfo: async (_, {username, id, timestamp, period}) => {
            const profile = await Profiles.findOne({username})
            const land = await Lands.findOne({shortid: id})
        
            if (profile && land) {

                land.timestamp = timestamp
                land.period = period

                await Lands.updateOne({shortid: id}, {$set: land})

                return LAND_INFO_UPDATED
            }

            return LAND_INFO_FALL
        },
        manageLandLocation: async (_, {username, id, option, title, category, cords, image, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const land = await Lands.findOne({shortid: id})
        
            if (profile && land) {
                
                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    land.locations = [...land.locations, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        cords,
                        image,
                        likes: 0
                    }]

                    land.locations = slicer(land.locations, limit)

                    feedback = LAND_LOCATION_CREATED

                } else if (option === 'like') {

                    land.locations.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = LAND_LOCATION_LIKED

                } else {

                    land.locations = land.locations.filter(el => el.shortid !== coll_id)

                    feedback = LAND_LOCATION_DELETED
                }

                await Lands.updateOne({shortid: id}, {$set: land})

                return feedback
            }

            return LAND_LOCATION_FALL
        }






    }
}

apollo_start(typeDefs, resolvers, app)

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))

// gql statuses

const {  
    PERSONAL_INFO_SUCCESS, PERSONAL_INFO_FALL,
    GEO_INFO_SUCCESS, GEO_INFO_FALL, 
    COMMON_INFO_SUCCESS, COMMON_INFO_FALL, 
    PASSWORD_SUCCESS, PASSWORD_FALL,
    TREASURE_CREATED, TREASURE_LIKED, TREASURE_DELETED, TREASURE_FALL
} = require('./gql-statuses/profile')

const {
    INDIVIDUAL_CREATED, INDIVIDUAL_FALL,
    INDIVIDUAL_QUOTE_CREATED, INDIVIDUAL_QUOTE_UPDATED, INDIVIDUAL_QUOTE_DELETED, INDIVIDUAL_QUOTE_FALL,
    INDIVIDUAL_IMAGE_CREATED, INDIVIDUAL_IMAGE_LIKED, INDIVIDUAL_IMAGE_DELETED, INDIVIDUAL_IMAGE_FALL,
    INDIVIDUAL_ACHIEVEMENT_UPDATED, INDIVIDUAL_ACHIEVEMENT_FALL
} = require('./gql-statuses/individual')

const {
    RAID_CREATED, RAID_FALL,
    RAID_STATUS_JOINED, RAID_STATUS_UPDATED, RAID_STATUS_EXIT, RAID_STATUS_FALL,
    RAID_INCIDENT_CREATED, RAID_INCIDENT_FALL,
    RAID_TOPIC_CREATED, RAID_TOPIC_LIKED, RAID_TOPIC_DELETED, RAID_TOPIC_FALL
} = require('./gql-statuses/raid')

const {
    STORY_CREATED, STORY_FALL,
    STORY_CHAPTER_CREATED, STORY_CHAPTER_FALL,
    STORY_INFO_UPDATED, STORY_INFO_FALL,
    STORY_QUESTION_CREATED, STORY_QUESTION_LIKED, STORY_QUESTION_REPLIED, STORY_QUESTION_DELETED, STORY_QUESTION_FALL,
    STORY_SHARING_CREATED, STORY_SHARING_FALL
} = require('./gql-statuses/story')

const {
    LAW_CREATED, LAW_FALL,
    LAW_VERSION_CREATED, LAW_VERSION_LIKED, LAW_VERSION_DELETED, LAW_VERSION_FALL,
    LAW_ISSUE_CREATED, LAW_ISSUE_FALL,
    LAW_INFO_UPDATED, LAW_INFO_FALL
} = require('./gql-statuses/law')

const {
    LAND_CREATED, LAND_FALL,
    LAND_FACT_CREATED, LAND_FACT_FALL,
    LAND_LOCATION_CREATED, LAND_LOCATION_LIKED, LAND_LOCATION_DELETED, LAND_LOCATION_FALL,
    LAND_INFO_UPDATED, LAND_INFO_FALL
} = require('./gql-statuses/land')