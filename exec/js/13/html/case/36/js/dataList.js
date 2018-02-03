/**
 * Created by Administrator on 2017/9/8.
 */
    /*JSON的键和值必须用双引号来写*/
var dataList = {
    'em_type':[
        {
            id: '1',
            name: '社会招聘',
            type: 'society'
        },
        {
            id: '2',
            name: '校园招聘',
            type: 'campus'
        }
    ],
    'em_list': [
        {
            id: '1',
            type: 'society',
            position: '前端工程师11',
            posType: '【社会招聘】',
            needNum: '6名',
            time: '2013-06-09',
            pay: '面议',
            place: '上海',
            background: '3年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操作；',
                '6.具备两年以上金融IT行业经验，特别是有金融行业相关业务的测试或者开发工作经验者优先。'
            ],
            technology: '从事计算机软件测试工作。'

        },
        {
            id: '2',
            type: 'society',
            position: '前端工程师22',
            posType: '【社会招聘】',
            needNum: '3名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '3年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操作；',
                '6.具备两年以上金融IT行业经验，特别是有金融行业相关业务的测试或者开发工作经验者优先。'
            ],
            technology: '从事计算机软件测试工作。'

        },
        {
            id: '3',
            type: 'society',
            position: '前端工程师33',
            posType: '【社会招聘】',
            needNum: '2名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '4',
            type: 'society',
            position: '前端工程师44',
            posType: '【社会招聘】',
            needNum: '2名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '5',
            type: 'society',
            position: '前端工程师55',
            posType: '【社会招聘】',
            needNum: '2名',
            time: '2015-07-09',
            pay: '8K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '6',
            type: 'society',
            position: '前端工程师66',
            posType: '【社会招聘】',
            needNum: '5名',
            time: '2017-07-09',
            pay: '7K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '7',
            type: 'society',
            position: '前端工程师77',
            posType: '【社会招聘】',
            needNum: '2名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '2年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '1',
            type: 'campus',
            position: '前端工程师11',
            posType: '【校园招聘】',
            needNum: '6名',
            time: '2013-06-09',
            pay: '面议',
            place: '上海',
            background: '3年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操作；',
                '6.具备两年以上金融IT行业经验，特别是有金融行业相关业务的测试或者开发工作经验者优先。'
            ],
            technology: '从事计算机软件测试工作。'

        },
        {
            id: '2',
            type: 'campus',
            position: '前端工程师22',
            posType: '【校园招聘】',
            needNum: '3名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '3年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操作；',
                '6.具备两年以上金融IT行业经验，特别是有金融行业相关业务的测试或者开发工作经验者优先。'
            ],
            technology: '从事计算机软件测试工作。'

        },
        {
            id: '3',
            type: 'campus',
            position: '前端工程师33',
            posType: '【校园招聘】',
            needNum: '2名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '4',
            type: 'campus',
            position: '前端工程师44',
            posType: '【校园招聘】',
            needNum: '2名',
            time: '2013-07-09',
            pay: '8K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        },
        {
            id: '5',
            type: 'campus',
            position: '前端工程师55',
            posType: '【校园招聘】',
            needNum: '2名',
            time: '2015-07-09',
            pay: '8K',
            place: '北京',
            background: '1年以上',
            education: '本科及以上',
            taskNeed:[
                '1.计算机或相关专业本科以上学历；',
                '2.从事软件测试工作3年以上；',
                '3.具备良好的沟通能力和快速学习能力；',
                '4.精通测试策略和方法、测试用例方法；',
                '5.熟悉DB2、AIX等平台的基本操。'
            ],
            technology: '从事计算机软件设计。'

        }
    ]
};